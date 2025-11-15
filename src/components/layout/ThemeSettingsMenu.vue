<template>
  <div
      class="w-56 rounded-xl border border-slate-200 bg-white dark:bg-slate-800 dark:border-slate-700 shadow-lg px-3 py-3 text-xs space-y-3"
  >
    <div>
      <p class="mb-1 font-semibold text-slate-800 dark:text-slate-100">
        Motyw
      </p>
      <div class="flex gap-2">
        <button
            type="button"
            class="flex-1 rounded-full border px-2 py-1"
            :class="theme === 'light'
            ? 'border-sky-400 bg-sky-50 text-sky-700'
            : 'border-slate-300 bg-white dark:bg-slate-700 dark:text-slate-100'"
            @click="selectTheme('light')"
        >
          Jasny
        </button>

        <button
            type="button"
            class="flex-1 rounded-full border px-2 py-1"
            :class="theme === 'dark'
            ? 'border-sky-400 bg-sky-50 dark:bg-sky-900 text-sky-700 dark:text-sky-200'
            : 'border-slate-300 bg-white dark:bg-slate-700 dark:text-slate-100'"
            @click="selectTheme('dark')"
        >
          Ciemny
        </button>
      </div>
    </div>

    <div>
      <p class="mb-1 font-semibold text-slate-800 dark:text-slate-100">
        Język
      </p>
      <div class="flex gap-2">
        <button
            type="button"
            class="flex-1 rounded-full border px-2 py-1"
            :class="locale === 'pl'
            ? 'border-sky-400 bg-sky-50 text-sky-700'
            : 'border-slate-300 bg-white dark:bg-slate-700 dark:text-slate-100'"
            @click="selectLocale('pl')"
        >
          PL
        </button>

        <button
            type="button"
            class="flex-1 rounded-full border px-2 py-1"
            :class="locale === 'en'
            ? 'border-sky-400 bg-sky-50 text-sky-700'
            : 'border-slate-300 bg-white dark:bg-slate-700 dark:text-slate-100'"
            @click="selectLocale('en')"
        >
          EN
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">

import {useTheme} from "../../composables/useTheme.ts";
import {useLocale} from "../../composables/useLocale.ts";

const { theme, setTheme } = useTheme();
const { locale, setLocale } = useLocale();

function selectTheme(value: 'light' | 'dark') {
  setTheme(value);
}

function selectLocale(value: 'pl' | 'en') {
  setLocale(value);
}
</script>
