import { defineStore } from "pinia";
import { computed, ref, watch } from "vue";

type ProfileLocal = {
    weightKg?: number;
    heightCm?: number;
    age?: number;
};

const KEY = "silex.profile.local.v1";

function safeParse(): ProfileLocal {
    try {
        const raw = localStorage.getItem(KEY);
        if (!raw) return {};
        const v = JSON.parse(raw);
        return (v && typeof v === "object") ? v : {};
    } catch {
        return {};
    }
}

function clampInt(n: number, min: number, max: number) {
    return Math.max(min, Math.min(max, Math.floor(n)));
}

export const useProfileStore = defineStore("profileLocal", () => {
    const initial = safeParse();

    const weightKg = ref<number | null>(typeof initial.weightKg === "number" ? initial.weightKg : null);
    const heightCm = ref<number | null>(typeof initial.heightCm === "number" ? initial.heightCm : null);
    const age = ref<number | null>(typeof initial.age === "number" ? initial.age : null);

    const asPayload = computed<ProfileLocal>(() => ({
        weightKg: weightKg.value ?? undefined,
        heightCm: heightCm.value ?? undefined,
        age: age.value ?? undefined,
    }));

    function setWeightKg(v: number | null) {
        if (v == null) { weightKg.value = null; return; }
        weightKg.value = clampInt(v, 30, 250);
    }

    function setHeightCm(v: number | null) {
        if (v == null) { heightCm.value = null; return; }
        heightCm.value = clampInt(v, 120, 230);
    }

    function setAge(v: number | null) {
        if (v == null) { age.value = null; return; }
        age.value = clampInt(v, 10, 120);
    }

    function reset() {
        weightKg.value = null;
        heightCm.value = null;
        age.value = null;
        localStorage.removeItem(KEY);
    }

    watch(
        () => asPayload.value,
        (payload) => {
            localStorage.setItem(KEY, JSON.stringify(payload));
        },
        { deep: true }
    );

    return {
        weightKg,
        heightCm,
        age,
        setWeightKg,
        setHeightCm,
        setAge,
        reset,
    };
});
