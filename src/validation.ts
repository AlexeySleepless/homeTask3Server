import { z } from "zod";
import { categoryType, categoryValues, ITask, priorityType, priorityValues, statusType, statusValues } from "./types";

function isTag<T extends {}>(value: unknown, values: T): value is keyof T{
    const keys = Object.keys(values)
    for(const key of keys){
        if(value === key){
            return true;
        }
    }
    return false
}

const isCategory = (value: unknown) => isTag(value, categoryValues);
const isStatus = (value: unknown) => isTag(value, statusValues);
const isPriority = (value: unknown) => isTag(value, priorityValues);

const taskSchema = z.object({
    id: z.number(),
    title: z.string(),
    description: z.string().optional(),
    category: z.custom<categoryType>(isCategory),
    status: z.custom<statusType>(isStatus),
    priority: z.custom<priorityType>(isPriority),
    date: z.number(),
})

function isDate(value: unknown): boolean{
    if(typeof value !== "number"){
        return false;
    }
    if(value < 0){
        return false
    }
    return value === +(new Date(value));
}

export const parseFunction  = (value: unknown): ITask | undefined => {
    const task =  taskSchema.safeParse(value).data;
    if(!task){
        return task;
    }
    if(!isDate(task.date)){
        return undefined;
    }
    return task;
}