const categoryValues = {
    BUG: "BUG",
    FEATURE: "FEATURE",
    DOCUMENTATION:"DOCUMENTATION",
    REFACTOR: "REFACTOR",
    TEST: "TEST",
} as const


const statusValues = {
    TODO: "TODO",
    INPROGRESS: "INPROGRESS",
    DONE: "DONE",
} as const


const priorityValues = {
    LOW: "LOW",
    MEDIUM: "MEDIUM",
    HIGH: "HIGH",
} as const


export type categoryType = keyof typeof categoryValues;
export type statusType = keyof typeof statusValues;
export type priorityType = keyof typeof priorityValues;

export interface ITask {
    id: number
    title: string;
    description?: string;
    category: categoryType;
    status: statusType;
    priority: priorityType;
    date: number
}


type Mutable<T, valueType> = {
    [P in keyof T]: valueType
}

type protectCheck = Mutable<ITask, (value: unknown) => boolean>

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



function isNumber(value: unknown): value is number{
    return typeof value === "number";
}

function isString(value: unknown): value is string{
    return typeof value === "string";
}

function isDate(value: unknown): boolean{
    if(!isNumber(value)){
        return false;
    }
    if(value < 0){
        return false
    }
    return value === +(new Date(value));
}


export function isTask( data: unknown ): data is ITask {
    if(!(data && typeof data === "object")){
        return false;
    }

    const requireProps: protectCheck = {
        "id": isNumber,
        "title": isString,
        "category": isCategory,
        "status": isStatus,
        "priority": isPriority,
        "date": isDate,
    }

    const reqProps = Object.keys(requireProps);
    const defaultFn = (value:unknown) => false;
    for(const prop of reqProps){
        if(!(prop in data)){
            return false;
        }
        const checkFn = requireProps[prop as keyof typeof requireProps]||defaultFn;
        const checkValue = data[prop as keyof typeof data];
        if(!checkFn(checkValue)){
            return false
        }
    }

    const optionalProps = {
        "description": isString
    }
    const optProps = Object.keys(optionalProps);
    for(const prop of optProps){
        if(!(prop in data)){
            continue;
        }
        const checkFn = requireProps[prop as keyof typeof requireProps]||defaultFn;
        const checkValue = data[prop as keyof typeof data];
        if(!checkFn(checkValue)){
            return false
        }
    }



    return true;
}