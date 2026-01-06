<template>
  <div>
    <aside
        class="fixed top-0 left-0 h-screen w-64 app-nav flex flex-col border-r transition-transform duration-300"
        :class="ui.isSidebarOpen ? 'translate-x-0' : '-translate-x-full'"
    >
      <div class="py-3 mb-4 border-b flex justify-center app-nav">
        <BaseLogo />
      </div>

      <div class="flex-1 overflow-y-auto py-2 px-2 space-y-2">
        <div class="px-2 text-xs opacity-60">
          {{ t("training.title") }}
        </div>

        <template v-if="auth.isLoggedIn">
          <button
              type="button"
              class="w-full rounded-xl px-3 py-3 font-medium border border-white/10 hover:opacity-90 transition app-surface"
              @click="goCreate"
          >
            + {{ t("training.addNew") }}
          </button>

          <button
              v-for="tr in trainingStore.items"
              :key="tr.id"
              type="button"
              class="w-full text-left rounded-xl px-3 py-3 border transition"
              :class="
              tr.id === trainingStore.selectedId
                ? 'border-sky-400 app-surface'
                : 'border-white/10 hover:app-surface'
            "
              @click="openTraining(tr.id)"
          >
            <div class="font-medium truncate flex items-center gap-2">
              <span class="shrink-0">{{ trainingMeta(tr.type).emoji }}</span>
              <span class="truncate">{{ tr.name }}</span>
            </div>

            <div class="text-xs opacity-70 truncate">
              {{ t(trainingMeta(tr.type).i18nKey) }}
            </div>
          </button>

          <div v-if="trainingStore.isLoading" class="text-xs opacity-70 px-2">
            {{ t("common.loading") }}
          </div>

          <div
              v-if="trainingStore.error"
              class="rounded-xl p-2 text-xs border border-red-500/30 text-red-200"
          >
            {{ t("common.error") }}: {{ trainingStore.error.message }}
          </div>
        </template>

        <div v-else class="px-2 text-xs opacity-60">
          {{ t("userPanel.login") }}
        </div>
      </div>

      <div class="px-3 py-4 app-nav">
        <div class="app-surface rounded-2xl px-4 py-3 text-xs space-y-3">
          <div class="flex items-center justify-between">
            <span class="truncate max-w-[150px]">{{ userName }}</span>

            <BaseDropdown>
              <template #trigger>
                <button class="px-2 py-1 rounded-xl app-surface">⚙️</button>
              </template>

              <div class="space-y-2 text-xs">
                <div class="flex items-center justify-between">
                  <span>{{ t("settings.theme.title") }}</span>
                  <button @click="toggleTheme" class="px-2 py-1 rounded-xl app-surface">
                    {{ theme === "dark" ? "🌙" : "☀️" }}
                  </button>
                </div>

                <div class="flex items-center justify-between">
                  <span>{{ t("settings.locale.title") }}</span>
                  <button
                      @click="setLocale(locale === 'pl' ? 'en' : 'pl')"
                      class="px-2 py-1 rounded-xl app-surface"
                  >
                    {{ locale === "pl" ? "PL" : "EN" }}
                  </button>
                </div>

                <div class="flex items-center justify-between">
                  <RouterLink to="/profile">
                    <span>{{ t("settings.profile.open") }}</span>
                  </RouterLink>
                </div>

                <div v-if="canSeeAdmin" class="flex items-center justify-between">
                <RouterLink to="/admin/users">
                    <span>{{ t("admin.panel.open") }}</span>
                  </RouterLink>
                </div>
              </div>
            </BaseDropdown>
          </div>

          <div class="app-footer" v-if="auth.isLoggedIn">
            <button type="button" @click="onLogout">
              {{ t("userPanel.logout") }}
            </button>
          </div>

          <div v-else>
            <nav class="flex flex-col gap-1 app-footer">
              <RouterLink to="/login">{{ t("userPanel.login") }}</RouterLink>
            </nav>
          </div>
        </div>
      </div>
    </aside>

    <button
        @click="ui.toggleSidebar()"
        class="fixed top-1/2 z-50 w-6 h-16 flex items-center justify-center rounded-r-full app-surface text-sm shadow transition-all duration-300"
        :class="ui.isSidebarOpen ? 'left-64' : 'left-0'"
    >
      {{ ui.isSidebarOpen ? "‹" : "›" }}
    </button>
  </div>
</template>

<script setup lang="ts">
import {computed, onMounted, ref, watch} from "vue";
import { RouterLink, useRouter, useRoute } from "vue-router";

import BaseLogo from "../ui/BaseLogo.vue";
import BaseDropdown from "../ui/BaseDropdown.vue";

import { useTrainingStore } from "../../features/training/stores/trainingStore";
import { useTheme } from "../composables/useTheme";
import { useLocale } from "../composables/useLocale";
import { useI18n } from "../composables/useI18n";
import { useAuthStore } from "../../features/auth/stores/authStore";
import { useUiStore } from "../stores/uiStore";

import { getTrainingTypeMeta } from "../../features/training/ui/trainingTypeMeta";
import {AdminService} from "../../features/admin/services/AdminService.ts";

const auth = useAuthStore();
const ui = useUiStore();
const trainingStore = useTrainingStore();

const router = useRouter();
const route = useRoute();

const { theme, toggleTheme } = useTheme();
const { locale, setLocale } = useLocale();
const { t } = useI18n();

const userName = computed(() =>
    auth.currentUser ? auth.currentUser.name : t("userPanel.greeting.noName")
);

const canSeeAdmin = ref(false);

async function refreshAdminAccess() {
  if (!auth.isLoggedIn) {
    canSeeAdmin.value = false;
    return;
  }

  try {
    canSeeAdmin.value = await AdminService.canAccessAdmin();
  } catch (e: any) {
    const status = e?.response?.status ?? e?.status ?? 0;

    if (status === 403 || status === 401 || status === 419) {
      canSeeAdmin.value = false;
      return;
    }

    console.error("Admin access check failed:", e);
    canSeeAdmin.value = false;
  }
}


onMounted(refreshAdminAccess);

watch(
    () => auth.isLoggedIn,
    () => refreshAdminAccess(),
    { immediate: true }
);


function trainingMeta(type: string) {
  return getTrainingTypeMeta(type);
}

async function ensureTrainingsLoaded() {
  if (!auth.isLoggedIn) return;
  if (trainingStore.items.length) return;
  await trainingStore.fetchList();
}

function goCreate() {
  trainingStore.setMode("create");
  trainingStore.selectById(null);
  router.push("/trainings");
}

async function openTraining(id: number) {
  trainingStore.setMode("details");
  trainingStore.selectById(id);

  if (route.path !== "/trainings") {
    await router.push("/trainings");
  }

  await trainingStore.fetchDetails(id);
}

async function onLogout() {
  await auth.logout();
  trainingStore.reset();
  await router.push("/login");
}

onMounted(ensureTrainingsLoaded);

watch(
    () => auth.isLoggedIn,
    async (loggedIn) => {
      if (!loggedIn) return;
      await ensureTrainingsLoaded();
    },
    { immediate: true }
);
</script>
