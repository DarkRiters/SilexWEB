import type { TrainingType } from "./TrainingType";

export type TrainingStatus = "planned" | "in_progress" | "finished" | "unknown";

export interface Training {
    id: number;
    name: string;
    type: TrainingType;

    durationMin: number; // backend time (min)
    distanceM: number;   // metry (UI trzyma metry)

    note?: string | null;
    photo_path?: string | null;

    status: TrainingStatus;
}
