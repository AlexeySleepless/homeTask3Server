import express from "express";
import { getCheckTaskData, getId, taskIndex } from "./utils";
import { ITask } from "./types";

let tasks: ITask[] = [];


export const createTask = ( req: express.Request, res: express.Response )=>{
    const task = getCheckTaskData(req);
    if(!task){
        res.sendStatus(400);
        return;
    }
    // id от клиента игнорируем
    task.id = Date.now();
    tasks.push(task);
    res.sendStatus(200);
};

export const getTasks = ( req: express.Request, res: express.Response )=>{
    res.status(200);
    res.json(tasks)
};

export const getTask = ( req: express.Request, res: express.Response )=>{
    const task = tasks.find(task => task.id === getId(req));
    if(!task){
        res.sendStatus(400);
        return;
    }
    res.status(200);
    res.json(task)
};

export const deleteTask = ( req: express.Request, res: express.Response )=>{
    const index = taskIndex(tasks, req);
    if(index < 0){
        res.sendStatus(400);
        return;
    }
    tasks.splice(index, 1);
    res.sendStatus(200);
};

export const updateTask = ( req: express.Request, res: express.Response )=>{
    const index = taskIndex(tasks, req);
    if(index < 0){
        res.sendStatus(400);
        return;
    }
    const task = getCheckTaskData(req);
    if(!task){
        res.sendStatus(400);
        return;
    }
    const prevData = tasks[index];
    tasks[index] = {...task, id: prevData.id, date: prevData.date};
    res.sendStatus(200);
};
