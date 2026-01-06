<script setup lang="ts">
import { computed, onMounted, reactive, ref, watch } from "vue";
import { useTrainingStore } from "../stores/trainingStore";
import { useI18n } from "../../../shared/composables/useI18n";
import { TRAINING_TYPES, type TrainingType, normalizeTrainingType, getTrainingTypeMeta } from "../domain/TrainingType";
import { estimateCalories } from "../ui/calories";
import { useProfileStore } from "../../../shared/stores/profileStore";
import type { TrainingEntry } from "../domain/TrainingEntry";

const store = useTrainingStore();
const fitnessProfile = useProfileStore();
const { t } = useI18n();

const defaultType: TrainingType = TRAINING_TYPES[0]?.value ?? "other";

const metaForm = reactive({
  name: "",
  type: defaultType as TrainingType,
});

function hydrateMeta() {
  const tr = store.selected;
  if (!tr) return;
  metaForm.name = tr.name ?? "";
  metaForm.type = normalizeTrainingType(tr.type);
}

function resetMetaForCreate() {
  metaForm.name = "";
  metaForm.type = defaultType;
}

const canSaveMeta = computed(() => metaForm.name.trim().length > 0);


const isEntryModalOpen = ref(false);
const entryForm = reactive({
  duration: "" as string,
  distance: "" as string,
});

function toInt(v: string): number {
  const n = Number(v);
  if (!Number.isFinite(n)) return 0;
  return Math.max(0, Math.floor(n));
}

function clampInt(n: number, min: number, max: number) {
  return Math.max(min, Math.min(max, Math.floor(n)));
}

function uuidLike() {
  return `${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

const activeType = computed<TrainingType>(() => {
  return store.selected ? normalizeTrainingType(store.selected.type) : metaForm.type;
});

const estimatedEntryCalories = computed(() => {
  const durationMin = toInt(entryForm.duration);
  const distanceM = toInt(entryForm.distance);

  return estimateCalories({
    type: activeType.value,
    durationMin,
    distanceM,
    weightKg: fitnessProfile.weightKg ?? undefined,
  });
});

function openEntryModal() {
  if (!store.selected) return;
  entryForm.duration = "";
  entryForm.distance = "";
  isEntryModalOpen.value = true;
}

function closeEntryModal() {
  isEntryModalOpen.value = false;
}


const avgSpeedKmh = computed(() => {
  const dKm = store.totals.totalDistanceM / 1000;
  const h = store.totals.totalDurationMin / 60;
  if (dKm <= 0 || h <= 0) return 0;
  return dKm / h;
});

function paceMinPerKm(speedKmh: number) {
  if (speedKmh <= 0) return "--:--";
  const minPerKm = 60 / speedKmh;
  const m = Math.floor(minPerKm);
  const s = Math.round((minPerKm - m) * 60);
  return `${m}:${String(s).padStart(2, "0")}`;
}

const avgPace = computed(() => paceMinPerKm(avgSpeedKmh.value));

const entriesNewestFirst = computed(() => store.entries);

function formatDate(iso: string) {
  try {
    return new Date(iso).toLocaleString();
  } catch {
    return iso;
  }
}

function typeLabel(typeValue: TrainingType) {
  return typeValue.charAt(0).toUpperCase() + typeValue.slice(1);
}


async function createTraining() {
  if (!canSaveMeta.value) return;

  await store.create({
    name: metaForm.name.trim(),
    type: metaForm.type,
    duration: 0,
    distance: 0,
    calories: 0,
  });

  hydrateMeta();
}

async function saveMeta() {
  if (!store.selectedId || !canSaveMeta.value) return;

  await store.update(store.selectedId, {
    name: metaForm.name.trim(),
    type: metaForm.type,
    duration: store.selected?.duration ?? 0,
    distance: store.selected?.distance ?? 0,
    calories: store.selected?.calories ?? 0,
  });

  hydrateMeta();
}

async function addEntry() {
  const id = store.selectedId;
  if (!id) return;

  const durationMin = clampInt(toInt(entryForm.duration), 0, 100000);
  const distanceM = clampInt(toInt(entryForm.distance), 0, 10000000);

  if (durationMin <= 0 && distanceM <= 0) {
    alert(`${t("common.error")}: ${t("training.entry.validation.provideDurationOrDistance")}`);
    return;
  }

  const entry: TrainingEntry = {
    id: uuidLike(),
    createdAt: new Date().toISOString(),
    durationMin,
    distanceM,
    caloriesKcal: clampInt(estimatedEntryCalories.value, 0, 20000),
  };

  store.addEntryLocal(entry);
  await store.syncTotalsToBackend();
  closeEntryModal();
}

async function removeEntry(entryId: string) {
  const ok = confirm(t("training.entry.confirm.remove"));
  if (!ok) return;

  store.removeEntryLocal(entryId);
  await store.syncTotalsToBackend();
}

async function removeTraining() {
  const id = store.selectedId;
  if (!id) return;

  const ok = confirm(t("training.confirm.delete"));
  if (!ok) return;

  await store.removeTraining(id);
}


onMounted(async () => {
  if (!store.items.length) await store.fetchList();

  if (store.mode === "create") resetMetaForCreate();
  else hydrateMeta();
});

watch(
    () => store.selected,
    () => {
      if (store.mode === "create") resetMetaForCreate();
      else hydrateMeta();
    },
    { immediate: true }
);

watch(
    () => store.mode,
    (m) => {
      if (m === "create") resetMetaForCreate();
    }
);
</script>

<template>
  <div class="p-6 max-w-3xl mx-auto space-y-6">
    <div class="app-surface rounded-2xl p-6 space-y-4">
      <div class="flex items-center justify-between">
        <h1 class="text-lg font-semibold">{{ t("training.details") }}</h1>

        <button
            class="text-sm opacity-70 hover:opacity-100"
            :disabled="store.isLoading"
            @click="store.fetchList()"
        >
          {{ t("common.refresh") }}
        </button>
      </div>

      <div v-if="store.isLoading" class="text-sm opacity-70">
        {{ t("common.loading") }}
      </div>

      <div
          v-else-if="store.error"
          class="rounded-xl p-3 border border-red-500/30 text-red-200"
      >
        {{ t("common.error") }}: {{ store.error.message }}
      </div>

      <div v-else-if="store.mode === 'create'" class="space-y-4">
        <div class="text-sm opacity-70">
          {{ t("training.addNew") }}
        </div>

        <div class="space-y-3">
          <div>
            <label class="text-xs opacity-70">{{ t("training.fields.name") }}</label>
            <input
                v-model="metaForm.name"
                class="mt-1 w-full rounded-xl px-3 py-2 app-surface border border-white/10"
                type="text"
                :placeholder="t('training.fields.name')"
            />
          </div>

          <div>
            <label class="text-xs opacity-70">{{ t("training.fields.type") }}</label>
            <select
                v-model="metaForm.type"
                class="mt-1 w-full rounded-xl px-3 py-2 app-surface border border-white/10"
            >
              <option v-for="tt in TRAINING_TYPES" :key="tt.value" :value="tt.value">
                {{ tt.emoji }} {{ typeLabel(tt.value) }}
              </option>
            </select>
          </div>

          <button
              class="w-full rounded-xl px-4 py-2 font-medium bg-green-600 hover:bg-green-500 disabled:opacity-50"
              :disabled="!canSaveMeta || store.isMutating"
              @click="createTraining"
          >
            {{ store.isMutating ? t("common.loading") : t("common.create") }}
          </button>

          <div class="text-xs opacity-60">
            {{ t("training.create.hint") }}
          </div>
        </div>
      </div>

      <div v-else-if="!store.selected" class="text-sm opacity-70">
        {{ t("training.selectHint") }}
      </div>

      <div v-else class="space-y-4">
        <div class="flex items-center justify-between">
          <div class="flex flex-wrap items-center gap-2 text-sm opacity-80">
            <span class="px-3 py-1 rounded-full border border-white/10">
              {{ getTrainingTypeMeta(store.selected.type).emoji }}
              {{ typeLabel(normalizeTrainingType(store.selected.type)) }}
            </span>

            <span class="px-3 py-1 rounded-full border border-white/10">
              {{ store.totals.entriesCount }} {{ t("training.details.entries") }}
            </span>
          </div>

          <button
              class="text-sm px-4 py-2 rounded-xl border border-white/10 hover:opacity-90 disabled:opacity-50"
              :disabled="store.isMutating"
              @click="openEntryModal"
          >
            {{ t("training.details.addEntry") }}
          </button>
        </div>

        <div class="space-y-3">
          <div>
            <label class="text-xs opacity-70">{{ t("training.fields.name") }}</label>
            <input
                v-model="metaForm.name"
                class="mt-1 w-full rounded-xl px-3 py-2 app-surface border border-white/10"
                type="text"
            />
          </div>

          <div>
            <label class="text-xs opacity-70">{{ t("training.fields.type") }}</label>
            <select
                v-model="metaForm.type"
                class="mt-1 w-full rounded-xl px-3 py-2 app-surface border border-white/10"
            >
              <option v-for="tt in TRAINING_TYPES" :key="tt.value" :value="tt.value">
                {{ tt.emoji }} {{ typeLabel(tt.value) }}
              </option>
            </select>
          </div>

          <div class="flex flex-col md:flex-row gap-2 pt-2">
            <button
                class="flex-1 rounded-xl px-4 py-2 font-medium border border-white/10 hover:opacity-90 disabled:opacity-50"
                :disabled="!canSaveMeta || store.isMutating"
                @click="saveMeta"
            >
              {{ store.isMutating ? t("common.loading") : t("training.details.saveDetails") }}
            </button>

            <button
                class="flex-1 rounded-xl px-4 py-2 font-medium border border-red-500/30 text-red-200 hover:opacity-90 disabled:opacity-50"
                :disabled="store.isMutating"
                @click="removeTraining"
            >
              {{ t("training.actions.delete") }}
            </button>
          </div>
        </div>
      </div>
    </div>

    <div v-if="store.mode !== 'create' && store.selected" class="app-surface rounded-2xl p-6 space-y-4">
      <div class="flex items-center justify-between">
        <h2 class="text-lg font-semibold">{{ t("training.details.summary.title") }}</h2>
        <div class="text-xs opacity-60">{{ t("training.details.summary.order") }}</div>
      </div>

      <div class="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
        <div class="rounded-xl p-3 border border-white/10">
          <div class="text-xs opacity-70">{{ t("training.details.summary.totalDuration") }}</div>
          <div class="font-semibold">{{ store.totals.totalDurationMin }} {{ t("training.units.minutes") }}</div>
        </div>

        <div class="rounded-xl p-3 border border-white/10">
          <div class="text-xs opacity-70">{{ t("training.details.summary.totalDistance") }}</div>
          <div class="font-semibold">{{ store.totals.totalDistanceM }} {{ t("training.units.meters") }}</div>
        </div>

        <div class="rounded-xl p-3 border border-white/10">
          <div class="text-xs opacity-70">{{ t("training.details.summary.totalCalories") }}</div>
          <div class="font-semibold">{{ store.totals.totalCaloriesKcal }} {{ t("training.units.calories") }}</div>
        </div>

        <div class="rounded-xl p-3 border border-white/10">
          <div class="text-xs opacity-70">{{ t("training.details.summary.avgSpeed") }}</div>
          <div class="font-semibold">{{ avgSpeedKmh.toFixed(1) }} km/h</div>
          <div class="text-xs opacity-60 mt-1">
            {{ t("training.details.summary.avgPace") }}: {{ avgPace }} min/km
          </div>
        </div>
      </div>

      <div class="text-xs opacity-60">
        Entries are stored locally (frontend). Totals are computed from entries.
      </div>
    </div>

    <div v-if="store.mode !== 'create' && store.selected" class="app-surface rounded-2xl p-6 space-y-4">
      <div class="flex items-center justify-between">
        <h2 class="text-lg font-semibold">{{ t("training.details.history.title") }}</h2>
        <div class="text-xs opacity-60">{{ store.totals.entriesCount }} {{ t("training.details.entries") }}</div>
      </div>

      <div v-if="!entriesNewestFirst.length" class="text-sm opacity-70">
        {{ t("training.details.history.empty") }}
      </div>

      <div v-else class="space-y-3">
        <div
            v-for="(e, idx) in entriesNewestFirst"
            :key="e.id"
            class="rounded-xl p-4 border border-white/10"
        >
          <div class="flex items-start justify-between gap-3">
            <div class="text-xs opacity-60">
              #{{ entriesNewestFirst.length - idx }} • {{ formatDate(e.createdAt) }}
            </div>

            <button
                class="text-xs px-3 py-1 rounded-xl border border-red-500/30 text-red-200 hover:opacity-90"
                :disabled="store.isMutating"
                @click="removeEntry(e.id)"
            >
              {{ t("training.details.history.remove") }}
            </button>
          </div>

          <div class="grid grid-cols-3 gap-3 mt-3 text-sm">
            <div class="rounded-xl p-3 border border-white/10">
              <div class="text-xs opacity-70">{{ t("training.fields.duration") }}</div>
              <div class="font-semibold">{{ e.durationMin }} {{ t("training.units.minutes") }}</div>
            </div>

            <div class="rounded-xl p-3 border border-white/10">
              <div class="text-xs opacity-70">{{ t("training.fields.distance") }}</div>
              <div class="font-semibold">{{ e.distanceM }} {{ t("training.units.meters") }}</div>
            </div>

            <div class="rounded-xl p-3 border border-white/10">
              <div class="text-xs opacity-70">{{ t("training.fields.calories") }}</div>
              <div class="font-semibold">{{ e.caloriesKcal }} {{ t("training.units.calories") }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div v-if="isEntryModalOpen" class="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div class="absolute inset-0 bg-black/60" @click="closeEntryModal"></div>

      <div class="relative w-full max-w-lg app-surface rounded-2xl p-6 space-y-4">
        <div class="flex items-center justify-between">
          <div class="text-lg font-semibold">{{ t("training.details.modal.title") }}</div>
          <button class="text-sm opacity-70 hover:opacity-100" @click="closeEntryModal">✕</button>
        </div>

        <div class="text-sm opacity-70">
          {{ t("training.details.modal.subtitle") }}
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div>
            <label class="text-xs opacity-70">{{ t("training.details.modal.duration") }}</label>
            <input
                v-model="entryForm.duration"
                class="mt-1 w-full rounded-xl px-3 py-2 app-surface border border-white/10"
                type="number"
                inputmode="numeric"
                min="0"
                max="100000"
                step="1"
            />
          </div>

          <div>
            <label class="text-xs opacity-70">{{ t("training.details.modal.distance") }}</label>
            <input
                v-model="entryForm.distance"
                class="mt-1 w-full rounded-xl px-3 py-2 app-surface border border-white/10"
                type="number"
                inputmode="numeric"
                min="0"
                max="10000000"
                step="1"
            />
          </div>
        </div>

        <div class="rounded-xl p-4 border border-white/10">
          <div class="text-xs opacity-70 mb-1">{{ t("training.details.modal.estimatedCalories") }}</div>
          <div class="text-2xl font-semibold">{{ estimatedEntryCalories }} {{ t("training.units.calories") }}</div>
          <div class="text-xs opacity-60 mt-2">
            {{ t("training.details.modal.usingWeight", { weight: fitnessProfile.weightKg ?? 70 }) }}
          </div>
        </div>

        <div class="flex gap-2 pt-2">
          <button
              class="flex-1 rounded-xl px-4 py-2 font-medium border border-white/10 hover:opacity-90 disabled:opacity-50"
              :disabled="store.isMutating"
              @click="closeEntryModal"
          >
            {{ t("training.details.modal.cancel") }}
          </button>

          <button
              class="flex-1 rounded-xl px-4 py-2 font-medium bg-green-600 hover:bg-green-500 disabled:opacity-50"
              :disabled="store.isMutating"
              @click="addEntry"
          >
            {{ store.isMutating ? t("common.loading") : t("training.details.modal.add") }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
