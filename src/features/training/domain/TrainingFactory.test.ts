import { describe, it, expect } from "vitest";
import { TrainingFactory } from "./TrainingFactory";

describe("TrainingFactory", () => {
    it("fromDTO fills defaults when optional fields missing", () => {
        const model = TrainingFactory.fromDTO({
            id: 1,
            name: "Test",
            type: "running",
            // duration/distance/calories undefined
            status: undefined,
        } as any);

        expect(model.duration).toBe(0);
        expect(model.distance).toBe(0);
        expect(model.calories).toBe(0);
        expect(model.status).toBe("unknown");
    });

    it("fromDTO normalizes status to known values only", () => {
        const m1 = TrainingFactory.fromDTO({ id: 1, name: "A", type: "other", status: "PLANNED" } as any);
        const m2 = TrainingFactory.fromDTO({ id: 1, name: "A", type: "other", status: "in_progress" } as any);
        const m3 = TrainingFactory.fromDTO({ id: 1, name: "A", type: "other", status: "finished" } as any);
        const m4 = TrainingFactory.fromDTO({ id: 1, name: "A", type: "other", status: "xd" } as any);

        expect(m1.status).toBe("planned");
        expect(m2.status).toBe("in_progress");
        expect(m3.status).toBe("finished");
        expect(m4.status).toBe("unknown");
    });

    it("toInput converts zeros to undefined (API payload optimization)", () => {
        const input = TrainingFactory.toInput({
            name: "T",
            type: "running",
            duration: 0,
            distance: 0,
            calories: 0,
        });

        expect(input).toEqual({
            name: "T",
            type: "running",
            duration: undefined,
            distance: undefined,
            calories: undefined,
        });
    });

    it("toInput keeps non-zero values", () => {
        const input = TrainingFactory.toInput({
            name: "T",
            type: "running",
            duration: 10,
            distance: 2000,
            calories: 300,
        });

        expect(input.duration).toBe(10);
        expect(input.distance).toBe(2000);
        expect(input.calories).toBe(300);
    });
});
