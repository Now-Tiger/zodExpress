import express, { Request, Response, Application } from "express";
import { zodMiddleware } from "./middlewares/zod.middleware";
import userRouter from "./routes/user.router";

const app: Application = express();
const PORT = process.env.PORT || 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use("/api/v1/", userRouter);

app.get("/", (_req: Request, res: Response) => {
  res.status(200).json({ message: "Welcome back Neo 👽" });
});

app.use(zodMiddleware);

app.listen(PORT, () => {
  console.log(`Application started @ http://localhost:${PORT}`);
});
