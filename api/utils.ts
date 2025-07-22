import { ITask } from "./types";
import { parseFunction } from "./validation";
import express from "express";

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