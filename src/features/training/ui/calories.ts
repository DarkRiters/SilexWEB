import type { TrainingType } from "../domain/TrainingType";
import { normalizeTrainingType } from "../domain/TrainingType";

function clamp(n: number, min: number, max: number) {
    return Math.max(min, Math.min(max, n));
}

export function estimateCalories(params: {
    type: TrainingType | string;
    durationMin?: number;
    distanceM?: number;
    weightKg?: number;
}): number {
    const weight = clamp(params.weightKg ?? 70, 40, 200);

    const duration = Math.max(0, Math.floor(params.durationMin ?? 0));
    const distanceKm = Math.max(0, (params.distanceM ?? 0) / 1000);

    const type = normalizeTrainingType(params.type);

    const metByType: Record<TrainingType, number> = {
        running: 9.8,
        walking: 3.5,
        cycling: 7.5,
        swimming: 8.0,
        gym: 6.0,
        boxing: 10.0,
        yoga: 3.0,
        other: 5.0,
    };

    const met = metByType[type];
    const kcalPerMin = (met * 3.5 * weight) / 200;
    const kcalFromTime = kcalPerMin * duration;

    let kcalFromDistance = 0;
    if (type === "running") kcalFromDistance = weight * distanceKm * 1.0;
    if (type === "walking") kcalFromDistance = weight * distanceKm * 0.5;
    if (type === "cycling") kcalFromDistance = weight * distanceKm * 0.3;

    const kcal = Math.max(kcalFromTime, kcalFromDistance);
    return Math.round(clamp(kcal, 0, 20000));
}
