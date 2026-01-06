export type TrainingStatusDTO = "planned" | "in_progress" | "finished" | string;

export interface TrainingDTO {
    id: number;
    name: string;
    type: string;

    duration?: number;
    distance?: number;
    calories?: number;

    status?: TrainingStatusDTO;
}

export interface TrainingInput {
    name: string;
    type: string;
    duration?: number;
    calories?: number;
    distance?: number;
}
