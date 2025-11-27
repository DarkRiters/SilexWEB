<template>
  <aside class="fixed left-0 top-0 h-screen w-64 app-nav flex flex-col">
    <div class="py-3 mb-4 border flex justify-center app-nav">
      <BaseLogo />
    </div>

    <div class="flex-1 overflow-y-auto py-2">
      <p class="text-xs text-gray-400">
        (lista treningów z API)
      </p>
    </div>

    <div class="px-3 py-4 app-nav">
      <div class="app-nav rounded-2xl px-4 py-3 text-xs">
        Welcome!
        <div class="flex gap-4">
          <button
              @click="toggleTheme"
              class="px-2 py-1 rounded-xl app-surface"
          >
            {{ theme === 'dark' ? '🌙' : '☀️' }}
          </button>
          <button
              @click="setLocale(locale === 'pl' ? 'en' : 'pl')"
              class="px-2 py-1 rounded-xl app-surface"
          >
            {{ locale === 'pl' ? 'PL' : 'EN' }}
          </button>
        </div>
        <nav class="flex flex-col gap-4 app-footer">
          <RouterLink to="/login">Login in</RouterLink>
        </nav>
      </div>
    </div>
  </aside>
</template>

<script setup lang="ts">
import BaseLogo from "../ui/BaseLogo.vue";
import {useTheme} from "../../composables/useTheme.ts";
import {useLocale} from "../../composables/useLocale.ts";
import {useI18n} from "../../composables/useI18n.ts";
const {theme, toggleTheme} = useTheme();
const {locale, setLocale} = useLocale();
const {t} = useI18n();
</script>
