import express from "express";
import { getCheckTaskData, getId, getTasksData, setTasksData, taskIndex } from "./utils";


export const createTask = ( req: express.Request, res: express.Response )=>{
    const task = getCheckTaskData(req);
    if(!task){
        res.sendStatus(400);
        return;
    }
    const tasks = getTasksData();
    // id от клиента игнорируем
    task.id = Date.now();
    tasks.push(task);
    setTasksData(tasks);
    res.sendStatus(200);
};

export const getTasks = ( req: express.Request, res: express.Response )=>{
    const tasks = getTasksData();
    res.status(200);
    res.json(tasks)
};

export const getTask = ( req: express.Request, res: express.Response )=>{
    const tasks = getTasksData();
    const task = tasks.find(task => task.id === getId(req));
    if(!task){
        res.sendStatus(400);
        return;
    }
    res.status(200);
    res.json(task)
};

export const deleteTask = ( req: express.Request, res: express.Response )=>{
    const tasks = getTasksData();
    const index = taskIndex(tasks, req);
    if(index < 0){
        res.sendStatus(400);
        return;
    }
    tasks.splice(index, 1);
    setTasksData(tasks);
    res.sendStatus(200);
};

export const updateTask = ( req: express.Request, res: express.Response )=>{
    const tasks = getTasksData();
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
    setTasksData(tasks);
    res.sendStatus(200);
};
