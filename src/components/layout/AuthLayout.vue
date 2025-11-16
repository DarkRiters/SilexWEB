<template>
  <div class="min-h-screen flex flex-col bg-slate-100 dark:bg-slate-900">
    <header
        class="h-16 flex items-center justify-between px-6
             border-b border-slate-200 dark:border-slate-700
             bg-white/80 dark:bg-slate-900/80 backdrop-blur"
    >
      <RouterLink
          to="/app/dashboard"
          class="text-2xl font-semibold tracking-[0.3em]
               text-sky-600 hover:text-sky-700
               dark:text-sky-400 dark:hover:text-sky-300"
      >
        SIŁEX
      </RouterLink>

      <div class="flex items-center gap-3 text-xs">
        <div class="flex items-center gap-2">
          <SettingsThemeSection />
          <SettingsLocaleSection />
        </div>
      </div>
    </header>

    <main class="flex-1 flex items-center justify-center px-4">
      <RouterView />
    </main>
  </div>
</template>

<script setup lang="ts">
import { RouterView, RouterLink } from 'vue-router';
import SettingsThemeSection from "../navigation/settings/SettingsThemeSection.vue";
import SettingsLocaleSection from "../navigation/settings/SettingsLocaleSection.vue";
</script>
