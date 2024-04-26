import { Router } from "express";
import { register, getUsers } from "../controller/user.controller";

const userRouter = Router();
userRouter.post("/register", register);
userRouter.get("/users", getUsers);

export default userRouter;
