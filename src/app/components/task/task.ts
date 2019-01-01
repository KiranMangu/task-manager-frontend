export interface Task {
    task: string;
    startDate: string;
    endDate: string;
    finished: boolean;
    priority: number;
    parentTask: string;
}