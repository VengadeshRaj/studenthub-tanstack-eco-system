import express from "express";
import  studentRouter  from "./routes/studentRouter";
import cors from "cors";

const PORT = process.env.PORT || 8080;

const app = express();

app.use(express.json());
app.use(cors());


app.use("/student", studentRouter);

app.listen(PORT, () => {
  console.log(`server is up and running at ${PORT}..`);
});
