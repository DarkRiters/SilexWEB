import { defineStore } from "pinia";
import { computed, ref } from "vue";

import type { Training } from "../domain/Training";
import type { TrainingInput } from "../domain/TrainingDTO";
import { TrainingFactory } from "../domain/TrainingFactory";
import { TrainingService } from "../services/TrainingService";
import { useAsyncAction } from "../../../shared/stores/useAsyncAction";

import type { TrainingEntry } from "../domain/TrainingEntry";
import { TrainingEntryRepository } from "../persistence/TrainingEntryRepository";

export type TrainingMode = "details" | "create";

export const useTrainingStore = defineStore("training", () => {
    const items = ref<Training[]>([]);
    const selected = ref<Training | null>(null);
    const mode = ref<TrainingMode>("details");

    const entries = ref<TrainingEntry[]>([]);

    const listAction = useAsyncAction();
    const mutateAction = useAsyncAction();

    const hasAny = computed(() => items.value.length > 0);
    const selectedId = computed(() => selected.value?.id ?? null);

    const totals = computed(() => {
        const totalDurationMin = entries.value.reduce((a, e) => a + (e.durationMin ?? 0), 0);
        const totalDistanceM = entries.value.reduce((a, e) => a + (e.distanceM ?? 0), 0);
        const totalCaloriesKcal = entries.value.reduce((a, e) => a + (e.caloriesKcal ?? 0), 0);

        return {
            totalDurationMin,
            totalDistanceM,
            totalCaloriesKcal,
            entriesCount: entries.value.length,
        };
    });

    function setMode(next: TrainingMode) {
        mode.value = next;
    }

    function loadEntriesFor(trainingId: number) {
        entries.value = TrainingEntryRepository.list(trainingId);
    }

    function selectById(id: number | null) {
        selected.value = id === null ? null : items.value.find((x) => x.id === id) ?? null;

        if (!selected.value) {
            entries.value = [];
            if (mode.value === "details") mode.value = "create";
            return;
        }

        loadEntriesFor(selected.value.id);
    }

    function reset() {
        items.value = [];
        selected.value = null;
        entries.value = [];
        mode.value = "create";
        listAction.reset();
        mutateAction.reset();
    }

    async function fetchList() {
        const dtos = await listAction.run(() => TrainingService.list());
        if (!dtos) return;

        items.value = dtos.map(TrainingFactory.fromDTO);

        if (mode.value === "details" && !selected.value) {
            selected.value = items.value[0] ?? null;
            if (!selected.value) mode.value = "create";
            else loadEntriesFor(selected.value.id);
        }
    }

    async function fetchDetails(id: number) {
        const dto = await listAction.run(() => TrainingService.get(id));
        if (!dto) return;

        const tr = TrainingFactory.fromDTO(dto);
        selected.value = tr;

        const idx = items.value.findIndex((x) => x.id === id);
        if (idx >= 0) items.value[idx] = tr;
        else items.value.unshift(tr);

        mode.value = "details";
        loadEntriesFor(id);
    }

    async function create(payload: TrainingInput) {
        const dto = await mutateAction.run(() => TrainingService.create(payload));
        if (!dto) return;

        const created = TrainingFactory.fromDTO(dto);
        items.value.unshift(created);
        selected.value = created;
        mode.value = "details";

        TrainingEntryRepository.set(created.id, []);
        entries.value = [];
    }

    async function update(id: number, payload: TrainingInput) {
        const dto = await mutateAction.run(() => TrainingService.update(id, payload));
        if (!dto) return;

        const updated = TrainingFactory.fromDTO(dto);
        selected.value = updated;

        const idx = items.value.findIndex((x) => x.id === id);
        if (idx >= 0) items.value[idx] = updated;
    }

    async function syncTotalsToBackend() {
        if (!selected.value) return;

        const id = selected.value.id;
        const t = totals.value;

        await update(id, {
            name: selected.value.name,
            type: String(selected.value.type),
            duration: t.totalDurationMin,
            distance: t.totalDistanceM,
            calories: t.totalCaloriesKcal,
        });
    }

    function addEntryLocal(entry: TrainingEntry) {
        if (!selected.value) return;
        entries.value = TrainingEntryRepository.add(selected.value.id, entry);
    }

    function removeEntryLocal(entryId: string) {
        if (!selected.value) return;
        entries.value = TrainingEntryRepository.remove(selected.value.id, entryId);
    }

    async function removeTraining(id: number) {
        const ok = await mutateAction.run(async () => {
            await TrainingService.remove(id);
            return true;
        });
        if (!ok) return;

        items.value = items.value.filter((x) => x.id !== id);
        TrainingEntryRepository.clear(id);

        if (selected.value?.id === id) {
            selected.value = items.value[0] ?? null;
            if (!selected.value) {
                entries.value = [];
                mode.value = "create";
            } else {
                loadEntriesFor(selected.value.id);
            }
        }
    }

    return {
        items,
        selected,
        selectedId,
        mode,
        hasAny,

        entries,
        totals,

        isLoading: listAction.isLoading,
        isMutating: mutateAction.isLoading,
        error: computed(() => listAction.error.value ?? mutateAction.error.value),

        setMode,
        selectById,
        reset,
        fetchList,
        fetchDetails,
        create,
        update,
        syncTotalsToBackend,
        addEntryLocal,
        removeEntryLocal,
        removeTraining,
    };
});
