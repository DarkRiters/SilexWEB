// src/features/training/stores/trainingStatsStore.ts
import { defineStore } from "pinia";
import { computed, ref } from "vue";
import { useAsyncAction } from "../../../shared/stores/useAsyncAction";
import type { TrainingStatsDTO } from "../domain/TrainingStatsDTO";
import { TrainingStatsService } from "../services/TrainingStatsService";

function toNumber(v: unknown): number {
    const n = typeof v === "string" ? Number(v) : (v as number);
    return Number.isFinite(n) ? n : 0;
}

/**
 * UWAGA: backend zwraca pole `time_seconds`,
 * ale w praktyce to są MINUTY w Twoich danych.
 * Dlatego wszędzie traktujemy to jako MINUTY.
 */
export const useTrainingStatsStore = defineStore("training-stats", () => {
    const stats = ref<TrainingStatsDTO | null>(null);
    const action = useAsyncAction();

    const isLoading = action.isLoading;
    const error = computed(() => action.error.value);

    const overall = computed(() => stats.value?.overall ?? null);
    const monthly = computed(() => stats.value?.monthly ?? []);

    const totalActivities = computed(() => overall.value?.activities ?? 0);
    const totalDistanceKm = computed(() => toNumber(overall.value?.distance));
    const totalTimeMinutes = computed(() => toNumber(overall.value?.time_seconds)); // ✅ MINUTY

    const avgSpeedKmh = computed(() => {
        const km = totalDistanceKm.value;
        const hours = totalTimeMinutes.value / 60; // ✅ min -> h
        if (km <= 0 || hours <= 0) return 0;
        return km / hours;
    });

    const avgPaceMinPerKm = computed(() => {
        const speed = avgSpeedKmh.value;
        if (speed <= 0) return "--:--";
        const minPerKm = 60 / speed;
        const m = Math.floor(minPerKm);
        const s = Math.round((minPerKm - m) * 60);
        return `${m}:${String(s).padStart(2, "0")}`;
    });

    async function fetch() {
        const data = await action.run(() => TrainingStatsService.get());
        if (!data) return;
        stats.value = data;
    }

    function reset() {
        stats.value = null;
        action.reset();
    }

    return {
        stats,
        overall,
        monthly,

        isLoading,
        error,

        totalActivities,
        totalDistanceKm,
        totalTimeMinutes, // ✅

        avgSpeedKmh,
        avgPaceMinPerKm,

        fetch,
        reset,
    };
});
