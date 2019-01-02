export interface Task {
    _id: string,
    task: string;
    startDate: string;
    endDate: string;
    finished: boolean;
    priority: number;
    parentTask: string;
}