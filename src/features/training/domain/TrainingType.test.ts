import { describe, it, expect } from "vitest";
import { normalizeTrainingType, getTrainingTypeMeta, TRAINING_TYPES } from "./TrainingType";

describe("TrainingType", () => {
    describe("normalizeTrainingType", () => {
        it("normalizes known values (trim + lowercase)", () => {
            expect(normalizeTrainingType(" RUNNING ")).toBe("running");
            expect(normalizeTrainingType("Walking")).toBe("walking");
            expect(normalizeTrainingType("cycling")).toBe("cycling");
        });

        it("returns 'other' for unknown / empty / nullish", () => {
            expect(normalizeTrainingType("???")).toBe("other");
            expect(normalizeTrainingType("")).toBe("other");
            expect(normalizeTrainingType(null)).toBe("other");
            expect(normalizeTrainingType(undefined)).toBe("other");
        });

        it("handles weird inputs safely", () => {
            expect(normalizeTrainingType(123)).toBe("other");
            expect(normalizeTrainingType({})).toBe("other");
            expect(normalizeTrainingType([])).toBe("other");
        });
    });

    describe("getTrainingTypeMeta", () => {
        it("returns meta for known type", () => {
            const meta = getTrainingTypeMeta("running");
            expect(meta.value).toBe("running");
            expect(meta.emoji).toBe("🏃");
            expect(meta.i18nKey).toBe("training.type.running");
        });

        it("returns fallback meta for unknown type", () => {
            const meta = getTrainingTypeMeta("nope");
            expect(meta.value).toBe("other");
        });

        it("fallback is stable and belongs to TRAINING_TYPES", () => {
            const meta = getTrainingTypeMeta("nope");
            expect(TRAINING_TYPES.some((x) => x.value === meta.value)).toBe(true);
        });
    });
});
