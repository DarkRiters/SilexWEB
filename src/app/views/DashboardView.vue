<template>
  <div class="min-h-screen px-6 py-8">
    <div class="max-w-6xl mx-auto space-y-6">
      <div class="app-surface p-6">
        <div class="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div class="space-y-1">
            <div class="text-xs opacity-70">{{ subtitle }}</div>
            <h1 class="text-2xl font-semibold tracking-tight">
              {{ title }}
            </h1>
          </div>

          <div class="flex flex-wrap gap-2">
            <button class="app-button-secondary rounded-xl px-4 py-2" @click="refresh" :disabled="busy">
              {{ busy ? t("common.loading") : t("common.refresh") }}
            </button>

            <button class="app-button rounded-xl px-4 py-2" @click="goCreate" :disabled="!auth.isLoggedIn">
              + {{ t("training.addNew") }}
            </button>
          </div>
        </div>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div class="app-surface p-5">
          <div class="text-xs opacity-70">{{ t("training.stats.totalTrainings") }}</div>
          <div class="mt-1 text-2xl font-semibold">{{ totalTrainings }}</div>
          <div class="mt-3 flex items-center gap-2 text-xs opacity-70">
            <span class="app-badge">📌</span>
            <span>Lista treningów po lewej</span>
          </div>
        </div>

        <div class="app-surface p-5">
          <div class="text-xs opacity-70">{{ t("training.stats.totalDuration") }}</div>
          <div class="mt-1 text-2xl font-semibold">{{ totalDuration }}</div>
          <div class="mt-3 text-xs opacity-70">
            Czas liczony z wpisów zakończeń (jeśli je dodajesz).
          </div>
        </div>

        <div class="app-surface p-5">
          <div class="text-xs opacity-70">{{ t("training.stats.totalCalories") }}</div>
          <div class="mt-1 text-2xl font-semibold">{{ totalCalories }}</div>
          <div class="mt-3 text-xs opacity-70">
            Szacunek bazuje na profilu fitness (lokalnie).
          </div>
        </div>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div class="lg:col-span-2 app-surface p-6">
          <div class="flex items-center justify-between">
            <h2 class="text-base font-semibold">Ostatnie treningi</h2>
            <RouterLink class="app-link text-sm" to="/trainings">Otwórz →</RouterLink>
          </div>

          <div class="mt-4">
            <div v-if="!auth.isLoggedIn" class="text-sm opacity-70">
              Zaloguj się, aby zobaczyć swoje treningi.
            </div>

            <div v-else-if="trainingStore.isLoading" class="text-sm opacity-70">
              {{ t("common.loading") }}
            </div>

            <div
                v-else-if="trainingStore.error"
                class="rounded-xl p-3 border border-red-500/30 text-red-200 text-sm"
            >
              {{ t("common.error") }}: {{ trainingStore.error.message }}
            </div>

            <div v-else-if="recentTrainings.length === 0" class="text-sm opacity-70">
              Brak treningów. Kliknij „{{ t("training.addNew") }}”.
            </div>

            <div v-else class="space-y-2">
              <button
                  v-for="tr in recentTrainings"
                  :key="tr.id"
                  type="button"
                  class="w-full text-left rounded-2xl px-4 py-3 border border-white/10 hover:opacity-95 hover:app-surface transition"
                  @click="openTraining(tr.id)"
              >
                <div class="flex items-center justify-between gap-3">
                  <div class="min-w-0">
                    <div class="flex items-center gap-2 font-medium">
                      <span class="shrink-0">{{ meta(tr.type).emoji }}</span>
                      <span class="truncate">{{ tr.name }}</span>
                      <span class="text-xs opacity-60">#{{ tr.id }}</span>
                    </div>
                    <div class="text-xs opacity-70 truncate">
                      {{ t(meta(tr.type).i18nKey) }}
                    </div>
                  </div>

                  <div class="text-xs opacity-70 shrink-0">
                    Otwórz →
                  </div>
                </div>
              </button>
            </div>
          </div>
        </div>

        <div class="app-surface p-6 space-y-4">
          <h2 class="text-base font-semibold">Szybkie akcje</h2>

          <div class="grid grid-cols-1 gap-2">
            <button class="app-button-secondary rounded-xl px-4 py-3 text-left" @click="goProfile">
              <div class="font-medium">Profil</div>
              <div class="text-xs opacity-70">Ustaw nazwę i dane fitness (lokalnie)</div>
            </button>

            <button class="app-button-secondary rounded-xl px-4 py-3 text-left" @click="toggleTheme">
              <div class="font-medium">Motyw</div>
              <div class="text-xs opacity-70">Aktualnie: {{ themeLabel }}</div>
            </button>

            <button class="app-button-secondary rounded-xl px-4 py-3 text-left" @click="toggleLocale">
              <div class="font-medium">Język</div>
              <div class="text-xs opacity-70">Aktualnie: {{ locale.toUpperCase() }}</div>
            </button>
          </div>

          <div class="pt-2 border-t border-white/10">
            <div class="text-xs opacity-70 mb-2">Status</div>

            <div class="space-y-2 text-sm">
              <div class="flex items-center justify-between">
                <span class="opacity-80">Zalogowany</span>
                <span class="font-medium">{{ auth.isLoggedIn ? "Tak" : "Nie" }}</span>
              </div>

              <div class="flex items-center justify-between">
                <span class="opacity-80">Użytkownik</span>
                <span class="font-medium truncate max-w-[180px]">{{ displayName }}</span>
              </div>

              <div v-if="isAdmin" class="flex items-center justify-between">
                <span class="opacity-80">Rola</span>
                <span class="app-badge">🛡️ Admin</span>
              </div>

              <RouterLink v-if="isAdmin" class="app-link text-sm" to="/admin/users">
                Panel administratora →
              </RouterLink>
            </div>
          </div>

        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from "vue";
import { RouterLink, useRouter } from "vue-router";

import { useI18n } from "../../shared/composables/useI18n";
import { useAuthStore } from "../../features/auth/stores/authStore";
import { useTrainingStore } from "../../features/training/stores/trainingStore";
import { useTheme } from "../../shared/composables/useTheme";
import { useLocale } from "../../shared/composables/useLocale";
import { getTrainingTypeMeta } from "../../features/training/ui/trainingTypeMeta";

const router = useRouter();

const { t } = useI18n();
const auth = useAuthStore();
const trainingStore = useTrainingStore();

const { theme, toggleTheme } = useTheme();
const { locale, setLocale } = useLocale();

const busy = ref(false);

const isAdmin = computed(() => {
  const u: any = auth.currentUser;
  if (!u) return false;

  const isAdminFlag =
      u.is_admin === true ||
      u.is_admin === 1 ||
      u.is_admin === "1" ||
      String(u.is_admin).toLowerCase() === "true";

  const roles = Array.isArray(u.roles) ? u.roles.map((r: any) => String(r).toLowerCase()) : [];
  return isAdminFlag || roles.includes("admin");
});

const displayName = computed(() => {
  if (!auth.currentUser) return t("userPanel.greeting.noName");
  return auth.currentUser.name ?? t("userPanel.greeting.noName");
});

const title = computed(() => (auth.isLoggedIn ? `Dashboard` : `Witaj`));
const subtitle = computed(() =>
    auth.isLoggedIn ? `Zarządzaj treningami i ustawieniami w jednym miejscu.` : `Zaloguj się, aby zacząć.`
);

function meta(type: unknown) {
  return getTrainingTypeMeta(type as any);
}

const recentTrainings = computed(() => {
  const items = trainingStore.items ?? [];
  return [...items].sort((a: any, b: any) => (b.id ?? 0) - (a.id ?? 0)).slice(0, 6);
});

const totalTrainings = computed(() => (trainingStore.items?.length ?? 0).toString());
const totalDuration = computed(() => "—");
const totalCalories = computed(() => "—");

const themeLabel = computed(() => (theme.value === "dark" ? "Ciemny" : "Jasny"));

async function refresh() {
  if (!auth.isLoggedIn) return;
  busy.value = true;
  try {
    await trainingStore.fetchList();
  } finally {
    busy.value = false;
  }
}

function goCreate() {
  trainingStore.setMode("create");
  trainingStore.selectById(null);
  router.push("/trainings");
}

async function openTraining(id: number) {
  trainingStore.setMode("details");
  trainingStore.selectById(id);
  await router.push("/trainings");
  await trainingStore.fetchDetails(id);
}

function goProfile() {
  router.push("/profile");
}

function toggleLocale() {
  setLocale(locale.value === "pl" ? "en" : "pl");
}

onMounted(async () => {
  if (auth.isLoggedIn && !trainingStore.items.length) {
    await refresh();
  }
});
</script>
