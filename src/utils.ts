import { ITask } from "./types";
import { parseFunction } from "./validation";
import express from "express";
import fs from "fs";

const fileName = "tasksData.json";

export const getId = ( req: express.Request ): number => {
    return +req.params.id;
}

export const getCheckTaskData = ( req: express.Request ): ITask|undefined => {
    const task = req.body;
    return parseFunction(task);
}

export const taskIndex = ( tasks: ITask[], req: express.Request ): number => {
    const taskId = getId(req)
    return tasks.findIndex( task => task.id === taskId);
}

export const setTasksData = ( tasks: ITask[] ) => {
    const data = JSON.stringify(tasks);
    fs.writeFileSync(fileName, data, {encoding: "utf-8"});
}

export const getTasksData = (): ITask[] => {
    let jsonString: string = "";
    let tasks: ITask[] = [];
    try{
        jsonString = fs.readFileSync(fileName, {encoding: "utf-8"});
        tasks = JSON.parse(jsonString);
    }catch(e){}
    if(!Array.isArray(tasks)){
        return [];
    }
    return tasks;
}