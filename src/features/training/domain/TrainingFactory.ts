import type { TrainingDTO, TrainingInput } from "./TrainingDTO";
import type { Training, TrainingStatus } from "./Training";

function normalizeStatus(s?: string): TrainingStatus {
    if (!s) return "unknown";
    const v = String(s).toLowerCase();
    if (v === "planned" || v === "in_progress" || v === "finished") return v;
    return "unknown";
}

export class TrainingFactory {
    static fromDTO(dto: TrainingDTO): Training {
        return {
            id: dto.id,
            name: dto.name,
            type: dto.type,
            duration: dto.duration ?? 0,
            distance: dto.distance ?? 0,
            calories: dto.calories ?? 0,
            status: normalizeStatus(dto.status),
        };
    }

    static toInput(model: Pick<Training, "name" | "type" | "duration" | "distance" | "calories">): TrainingInput {
        return {
            name: model.name,
            type: model.type,
            duration: model.duration || undefined,
            distance: model.distance || undefined,
            calories: model.calories || undefined,
        };
    }
}
