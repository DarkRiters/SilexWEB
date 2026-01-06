import { api } from "../../../shared/services/http/api";
import type { TrainingDTO, TrainingInput } from "../domain/TrainingDTO";

type ActivityDTO = {
    id: number;
    user_id: number;
    started_at: string | null;
    ended_at: string | null;
    name: string | null;
    type: string | null;
    note: string | null;
    photo_url: string | null;
    distance: number | null;
    created_at: string;
    updated_at: string;
};

function minutesBetween(startIso: string | null, endIso: string | null): number {
    if (!startIso || !endIso) return 0;
    const a = Date.parse(startIso);
    const b = Date.parse(endIso);
    if (!Number.isFinite(a) || !Number.isFinite(b)) return 0;
    return Math.max(0, Math.floor((b - a) / 60000));
}

function activityToTrainingDTO(a: ActivityDTO): TrainingDTO {
    const status = a.ended_at ? "finished" : a.started_at ? "in_progress" : "planned";
    const duration = minutesBetween(a.started_at, a.ended_at);

    return {
        id: a.id,
        name: a.name ?? "(no name)",
        type: a.type ?? "other",
        duration,
        distance: a.distance ?? 0,
        calories: 0,
        status,
    };
}

export class TrainingService {
    static async list(): Promise<TrainingDTO[]> {
        const { data } = await api.get<ActivityDTO[]>("/activities");
        return data.map(activityToTrainingDTO);
    }

    static async get(id: number): Promise<TrainingDTO> {
        const { data } = await api.get<ActivityDTO>(`/activities/${id}`);
        return activityToTrainingDTO(data);
    }

    static async create(payload: TrainingInput): Promise<TrainingDTO> {
        const now = new Date().toISOString();

        const started = await api.post<ActivityDTO>("/activities/start", {
            started_at: now,
        });

        const id = started.data.id;

        const { data } = await api.post<ActivityDTO>(`/activities/finish/${id}`, {
            ended_at: now,
            name: payload.name,
            type: payload.type,
            note: null,
            photo_url: null,
            distance: payload.distance ?? 0,
        });

        return activityToTrainingDTO(data);
    }

    static async update(id: number, payload: TrainingInput): Promise<TrainingDTO> {
        const endedAt = new Date().toISOString();

        const { data } = await api.post<ActivityDTO>(`/activities/finish/${id}`, {
            ended_at: endedAt,
            name: payload.name,
            type: payload.type,
            note: null,
            photo_url: null,
            distance: payload.distance ?? 0,
        });

        return activityToTrainingDTO(data);
    }

    static async remove(id: number): Promise<void> {
        await api.delete(`/activities/${id}`);
    }
}
