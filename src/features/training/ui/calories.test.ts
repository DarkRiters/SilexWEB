import { describe, expect, it } from "vitest";
import { estimateCalories } from "./calories";

describe("estimateCalories", () => {
    it("returns 0 when no duration and no distance", () => {
        expect(estimateCalories({ type: "running" })).toBe(0);
        expect(estimateCalories({ type: "walking", durationMin: 0, distanceM: 0 })).toBe(0);
    });

    it("clamps weight to [40..200]", () => {
        // dystans 1km, running => kcalFromDistance = weight * 1.0 * 1km
        expect(estimateCalories({ type: "running", distanceM: 1000, weightKg: 10 })).toBe(40);
        expect(estimateCalories({ type: "running", distanceM: 1000, weightKg: 999 })).toBe(200);
    });

    it("uses max(time-based, distance-based)", () => {
        // dla biegania: 1km przy 70kg => 70kcal dystansowo
        // czasowo: 1 min będzie mniejsze, więc wyjdzie 70
        expect(estimateCalories({ type: "running", distanceM: 1000, durationMin: 1, weightKg: 70 })).toBe(70);
    });

    it("rounds and clamps final kcal to [0..20000]", () => {
        expect(estimateCalories({ type: "running", durationMin: 10_000, weightKg: 200 })).toBe(20000);
        expect(estimateCalories({ type: "running", durationMin: -5, distanceM: -100 })).toBe(0);
    });

    it("handles unknown type by normalizeTrainingType (should not throw)", () => {
        const out = estimateCalories({ type: "UNKNOWN_TYPE", durationMin: 30, weightKg: 70 });
        expect(Number.isFinite(out)).toBe(true);
        expect(out).toBeGreaterThanOrEqual(0);
    });

    it("distance based differs by type (running > walking for same distance/weight)", () => {
        const running = estimateCalories({ type: "running", distanceM: 5000, durationMin: 0, weightKg: 70 });
        const walking = estimateCalories({ type: "walking", distanceM: 5000, durationMin: 0, weightKg: 70 });
        expect(running).toBeGreaterThan(walking);
    });
});
