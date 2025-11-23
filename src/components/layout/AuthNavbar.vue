<template>
  <header class="w-full flex items-center justify-between px-6 py-3  app-nav">
    <div class="font-semibold tracking-wide text-blue-500 hover:text-blue-400">
      <nav class="flex gap-4">
        <RouterLink
            to="/dashboard"
        >
          SilexWEB
        </RouterLink>
      </nav>
    </div>
    <nav class="flex gap-4">
      <RouterLink
          to="/login"
      >
        Logowanie
      </RouterLink>
      <RouterLink
          to="/register"
      >
        Rejestracja
      </RouterLink>
      <RouterLink
          to="/forgot-password"
      >
        Odzyskaj konto
      </RouterLink>
    </nav>
    <div class="flex gap-4">
      <button
          @click="toggleTheme"
          class="px-2 py-1 app-surface"
      >
        {{ theme === 'dark' ? '🌙' : '☀️' }}
      </button>
      <button
          @click="setLocale(locale === 'pl' ? 'en' : 'pl')"
          class="px-2 py-1 app-surface"
      >
        {{ locale === 'pl' ? 'en' : 'pl' }}
      </button>
    </div>
  </header>
</template>

<script setup lang="ts">

import {useTheme} from "../../composables/useTheme.ts";
import {useLocale} from "../../composables/useLocale.ts";
const {theme, toggleTheme} = useTheme();
const {locale, setLocale} = useLocale();
</script>