// @vitest-environment jsdom
import { describe, it, expect, beforeEach, vi } from "vitest";
import { TrainingEntryRepository } from "./TrainingEntryRepository";
import type { TrainingEntry } from "../domain/TrainingEntry";

const KEY = "silex.training.entries.v1";

function makeEntry(id: string, durationMin?: number, distanceM?: number, caloriesKcal?: number): TrainingEntry {
    return {
        id,
        createdAt: new Date().toISOString(),
        durationMin,
        distanceM,
        caloriesKcal,
    } as TrainingEntry;
}

describe("TrainingEntryRepository", () => {
    beforeEach(() => {
        localStorage.clear();
    });

    it("returns empty list when no data", () => {
        expect(TrainingEntryRepository.list(1)).toEqual([]);
    });

    it("add() prepends newest first and persists", () => {
        const e1 = makeEntry("a", 10, 1000, 100);
        const e2 = makeEntry("b", 20, 2000, 200);

        TrainingEntryRepository.add(1, e1);
        TrainingEntryRepository.add(1, e2);

        const list = TrainingEntryRepository.list(1);
        expect(list.map((x) => x.id)).toEqual(["b", "a"]);

        // sprawdź zapis w localStorage
        const raw = localStorage.getItem(KEY);
        expect(raw).toBeTruthy();
        const parsed = JSON.parse(raw!);
        expect(parsed["1"].map((x: any) => x.id)).toEqual(["b", "a"]);
    });

    it("remove() deletes only selected entry", () => {
        TrainingEntryRepository.set(1, [makeEntry("a"), makeEntry("b"), makeEntry("c")]);

        const next = TrainingEntryRepository.remove(1, "b");
        expect(next.map((x) => x.id)).toEqual(["a", "c"]);
        expect(TrainingEntryRepository.list(1).map((x) => x.id)).toEqual(["a", "c"]);
    });

    it("clear() removes one trainingId only", () => {
        TrainingEntryRepository.set(1, [makeEntry("a")]);
        TrainingEntryRepository.set(2, [makeEntry("b")]);

        TrainingEntryRepository.clear(1);

        expect(TrainingEntryRepository.list(1)).toEqual([]);
        expect(TrainingEntryRepository.list(2).map((x) => x.id)).toEqual(["b"]);
    });

    it("clearAll() removes key and emits change event", () => {
        TrainingEntryRepository.set(1, [makeEntry("a")]);

        const spy = vi.fn();
        window.addEventListener(TrainingEntryRepository.CHANGE_EVENT, spy);

        TrainingEntryRepository.clearAll();

        expect(localStorage.getItem(KEY)).toBeNull();
        expect(spy).toHaveBeenCalledTimes(1);
    });

    it("totalsForTrainingIds() sums only passed IDs (isolates other trainings)", () => {
        TrainingEntryRepository.set(1, [
            makeEntry("a", 10, 1000, 100),
            makeEntry("b", 5, 500, 50),
        ]);
        TrainingEntryRepository.set(2, [makeEntry("c", 20, 2000, 200)]);
        TrainingEntryRepository.set(999, [makeEntry("x", 999, 999999, 99999)]); // ma być ignorowane

        const totals = TrainingEntryRepository.totalsForTrainingIds([1, 2]);

        expect(totals.totalDurationMin).toBe(10 + 5 + 20);
        expect(totals.totalDistanceM).toBe(1000 + 500 + 2000);
        expect(totals.totalCaloriesKcal).toBe(100 + 50 + 200);
        expect(totals.entriesCount).toBe(3);
    });
});
