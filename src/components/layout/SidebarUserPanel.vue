<template>
  <div class="relative">
    <div
        class="rounded-2xl border border-slate-200 bg-white dark:bg-slate-800 px-4 py-3 shadow-sm flex flex-col gap-3"
    >
      <div class="flex items-center justify-between gap-3">
        <div class="flex items-center gap-3">
          <div
              class="w-9 h-9 rounded-full bg-slate-200 dark:bg-slate-600 flex items-center justify-center text-xs text-slate-500"
          >
            :)
          </div>

          <p class="text-sm font-semibold text-slate-900 dark:text-slate-50">
            {{ greeting }}
          </p>
        </div>

        <div class="flex items-center gap-3 text-xl text-slate-800 dark:text-slate-100">
          <button
              type="button"
              class="hover:text-sky-600 dark:hover:text-sky-400 transition"
          >
            🔔
          </button>
          <button
              type="button"
              class="hover:text-sky-600 dark:hover:text-sky-400 transition"
              @click="toggleSettings"
          >
            ⚙️
          </button>
        </div>
      </div>

      <div class="flex gap-2 text-xs text-slate-400 dark:text-slate-500">
        <span>(Wyloguj / profil)</span>
      </div>
    </div>

    <div
        v-if="settingsOpen"
        class="absolute right-0 bottom-full mb-3"
    >
      <ThemeSettingsMenu />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import ThemeSettingsMenu from './ThemeSettingsMenu.vue';
import {useLocale} from "../../composables/useLocale.ts";

const props = defineProps<{
  userName?: string | null;
}>();

const { locale } = useLocale();

const greeting = computed(() => {
  const hasName = props.userName && props.userName.trim().length > 0;
  const isEn = locale.value === 'en';

  if (hasName) {
    return isEn
        ? `Welcome, ${props.userName}!`
        : `Witaj ${props.userName}!`;
  }

  return isEn ? 'Welcome!' : 'Witaj!';
});

const settingsOpen = ref(false);

function toggleSettings() {
  settingsOpen.value = !settingsOpen.value;
}
</script>

