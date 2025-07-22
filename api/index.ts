import express, { ErrorRequestHandler } from "express";
import cors from "cors";
import { createTask, deleteTask, getTask, getTasks, updateTask } from "./methods";

const port = 3000;
const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
    res.status(500);
    res.send("Something broken");
}

const app = express();
app.use(cors());
app.use(express.json());
app.use(errorHandler);

app.get("/", (req, res) => res.send("Express on Vercel"));
app.get("/tasks",getTasks);
app.post("/tasks", createTask);
app.get("/tasks/:id",getTask);
app.delete("/tasks/:id", deleteTask);
app.patch("/tasks/:id", updateTask);

app.listen(port, ()=>{console.log("server start")})

module.exports = app;
