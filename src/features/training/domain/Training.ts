export type TrainingStatus = "planned" | "in_progress" | "finished" | "unknown";

export interface Training {
    id: number;
    name: string;
    type: string;

    duration: number;
    distance: number;
    calories: number;

    status: TrainingStatus;
}
