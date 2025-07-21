import express from "express";
import cors from "cors";
import events from "events";

const port = 5000;

const eventEmitter = new events.EventEmitter();

const app = express();
app.use(cors());
app.use(express.json());
const data: any = [];

app.get("/tasks",(req, res)=>{
    res.status(200);
    res.json(data)

});
app.post("/tasks",(req, res)=>{
    const message = req.body;
    data.push(message);
    res.status(200);
    res.send();
});

app.listen(port, ()=>{console.log("server start")})
