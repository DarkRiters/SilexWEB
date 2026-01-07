import type { MessageKey } from "../../../shared/i18n/messages";

export type TrainingType =
    | "running"
    | "walking"
    | "cycling"
    | "skating"       // rolki
    | "skateboarding" // deskorolka
    | "other";

export type TrainingTypeMeta = {
    value: TrainingType;
    i18nKey: MessageKey;
    emoji: string;
};

export const TRAINING_TYPES = [
    { value: "running", i18nKey: "training.type.running", emoji: "🏃" },
    { value: "walking", i18nKey: "training.type.walking", emoji: "🚶" },
    { value: "cycling", i18nKey: "training.type.cycling", emoji: "🚴" },
    { value: "skating", i18nKey: "training.type.skating", emoji: "🛼" },
    { value: "skateboarding", i18nKey: "training.type.skateboarding", emoji: "🛹" },
    { value: "other", i18nKey: "training.type.other", emoji: "✨" },
] as const satisfies readonly TrainingTypeMeta[];

export function normalizeTrainingType(v: unknown): TrainingType {
    const s = String(v ?? "").trim().toLowerCase();
    const ok = TRAINING_TYPES.some((x) => x.value === s);
    return (ok ? s : "other") as TrainingType;
}

const FALLBACK_META: TrainingTypeMeta =
    TRAINING_TYPES.find((x) => x.value === "other") ?? TRAINING_TYPES[0];

export function getTrainingTypeMeta(type: unknown): TrainingTypeMeta {
    const norm = normalizeTrainingType(type);
    return TRAINING_TYPES.find((x) => x.value === norm) ?? FALLBACK_META;
}
