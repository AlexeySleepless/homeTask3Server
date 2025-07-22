export const categoryValues = {
    BUG: "BUG",
    FEATURE: "FEATURE",
    DOCUMENTATION:"DOCUMENTATION",
    REFACTOR: "REFACTOR",
    TEST: "TEST",
} as const


export const statusValues = {
    TODO: "TODO",
    INPROGRESS: "INPROGRESS",
    DONE: "DONE",
} as const


export const priorityValues = {
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