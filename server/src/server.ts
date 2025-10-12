import express from "express";
import  studentRouter  from "./routes/studentRouter";

const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.json());

app.use("/student", studentRouter);

app.listen(PORT, () => {
  console.log(`server is up and running at ${PORT}..`);
});
