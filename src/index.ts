import express, { Request, Response, Application } from "express";
import { zodMiddleware } from "./middlewares/zod.middleware";
import { z } from "zod";
import userRouter from "./routes/user.router";

/** upload/write this project on notion blog - zod validations*/

const app: Application = express();
const PORT = 5000;

app.use(express.json());
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use("/api/v1/", userRouter);

/** work on postman; cannot make this request from terminal */
app.get("/", (_req: Request, res: Response) => {
  const bodySchema = z.object({
    name: z.string().trim().min(3).max(255),
  });
  const result = bodySchema.parse(_req?.body);
  res.status(200).json({
    messsage: "Hello World",
    body: result,
  });
});

app.use(zodMiddleware);

app.listen(PORT, () => {
  console.log(`Application started @ http://localhost:${PORT}`);
});
