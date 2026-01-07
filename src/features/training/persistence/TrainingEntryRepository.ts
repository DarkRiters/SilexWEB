import type { TrainingEntry } from "../domain/TrainingEntry";

const KEY = "silex.training.entries.v1";
const CHANGE_EVENT = "silex.training.entries.changed";

type StoreShape = Record<string, TrainingEntry[]>; // trainingId -> entries

function emitChange() {
    window.dispatchEvent(new Event(CHANGE_EVENT));
}

function safeParse(json: string | null): StoreShape {
    if (!json) return {};
    try {
        const v = JSON.parse(json);
        return v && typeof v === "object" ? (v as StoreShape) : {};
    } catch {
        return {};
    }
}

function readAll(): StoreShape {
    return safeParse(localStorage.getItem(KEY));
}

function writeAll(data: StoreShape) {
    localStorage.setItem(KEY, JSON.stringify(data));
    emitChange();
}

function sumEntries(entries: TrainingEntry[]) {
    const totalDurationMin = entries.reduce((a, e) => a + (e.durationMin ?? 0), 0);
    const totalDistanceM = entries.reduce((a, e) => a + (e.distanceM ?? 0), 0);
    const totalCaloriesKcal = entries.reduce((a, e) => a + (e.caloriesKcal ?? 0), 0);

    return {
        totalDurationMin,
        totalDistanceM,
        totalCaloriesKcal,
        entriesCount: entries.length,
    };
}

export const TrainingEntryRepository = {
    CHANGE_EVENT,

    list(trainingId: number): TrainingEntry[] {
        const all = readAll();
        return all[String(trainingId)] ?? [];
    },

    set(trainingId: number, entries: TrainingEntry[]) {
        const all = readAll();
        all[String(trainingId)] = entries;
        writeAll(all);
    },

    add(trainingId: number, entry: TrainingEntry): TrainingEntry[] {
        const current = this.list(trainingId);
        const next = [entry, ...current]; // newest first
        this.set(trainingId, next);
        return next;
    },

    remove(trainingId: number, entryId: string): TrainingEntry[] {
        const current = this.list(trainingId);
        const next = current.filter((e) => e.id !== entryId);
        this.set(trainingId, next);
        return next;
    },

    clear(trainingId: number) {
        const all = readAll();
        delete all[String(trainingId)];
        writeAll(all);
    },

    clearAll() {
        localStorage.removeItem(KEY);
        emitChange();
    },

    /**
     * ✅ Globalne sumy tylko dla przekazanych treningów (ID z backendu).
     * To rozwiązuje problem “nowe konto widzi stare entry”.
     */
    totalsForTrainingIds(trainingIds: number[]) {
        const all = readAll();

        let totalDurationMin = 0;
        let totalDistanceM = 0;
        let totalCaloriesKcal = 0;
        let entriesCount = 0;

        for (const id of trainingIds) {
            const entries = all[String(id)] ?? [];
            const s = sumEntries(entries);
            totalDurationMin += s.totalDurationMin;
            totalDistanceM += s.totalDistanceM;
            totalCaloriesKcal += s.totalCaloriesKcal;
            entriesCount += s.entriesCount;
        }

        return { totalDurationMin, totalDistanceM, totalCaloriesKcal, entriesCount };
    },
};
