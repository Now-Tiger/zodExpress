import { Request, Response } from "express";
import { z } from "zod";

/** in memory database */
const db: object[] = [];

/** user schema for user data validation */
const userSchema = z
  .object({
    username: z.string().trim().min(5).max(20),
    password: z.string().min(5).max(20),
    confirm: z.string().min(5).max(20),
    email: z.string().email().max(100),
  })
  .refine((obj) => obj.password == obj.confirm, {
    // so above line just an out of the box method which zod provides to validate the data.
    message: "Passwords do not match",
    path: ["confirm"],
  });

/** register user and save data in the in memory database */
export const register = (_req: Request, res: Response) => {
  /** get username, password, confim, email from request body */
  const data = _req?.body;
  const res_ = userSchema.parse(data);

  res.status(201).json({
    success: true,
    message: "User registered 🎉",
    username: res_.username,
  });

  /** Erroneous data isn't pushed to the database, handled by zod middleware */
  db.push(res_);
};

export const getUsers = (_req: Request, res: Response) => {
  try {
    if (db.length < 1) {
      res.status(404).json({ success: false, message: "Database is empty 🤔" });
    } else {
      /** filter db to get only usernames from the db.
       * You dont want to see users passwords - keep the data integirty */
      res.status(200).json({ success: true, data: db });
    }
  } catch (e) {
    res.status(500).json({ error: "Internal Server Error 😲" });
  }
};
