import type { TrainingEntry } from "../domain/TrainingEntry";

const KEY = "silex.training.entries.v1";

type StoreShape = Record<string, TrainingEntry[]>;

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
}

export const TrainingEntryRepository = {
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
        const next = [entry, ...current];
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
    },
};
