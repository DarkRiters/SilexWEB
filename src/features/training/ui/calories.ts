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

    // MET orientacyjny (wystarczający do MVP). I tak finalnie dystans będzie ważniejszy dla running/walking/cycling.
    const metByType: Record<TrainingType, number> = {
        running: 9.8,
        walking: 3.5,
        cycling: 7.5,
        skating: 7.0,
        skateboarding: 5.0,
        other: 5.0,
    };

    const met = metByType[type];
    const kcalPerMin = (met * 3.5 * weight) / 200;
    const kcalFromTime = kcalPerMin * duration;

    // Dystansowe przybliżenia (proste, ale logiczne)
    let kcalFromDistance = 0;

    const kcalPerKmByType: Record<TrainingType, number> = {
        running: 1.0,
        walking: 0.5,
        cycling: 0.3,
        skating: 0.45,        // rolki: sensowny środek
        skateboarding: 0.25,  // deska: zwykle mniej
        other: 0.4,           // fallback dystansowy
    };

    kcalFromDistance = weight * distanceKm * kcalPerKmByType[type];

    // Rolki/deska: dystans istnieje, ale tempo/technika mocno miesza — zostawiamy time-based jako główne źródło.
    const kcal = Math.max(kcalFromTime, kcalFromDistance);
    return Math.round(clamp(kcal, 0, 20000));
}
