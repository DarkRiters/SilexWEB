<template>
  <div class="min-h-screen flex flex-col bg-surface-muted dark:bg-surface-dark">
    <header class="ui-auth-header-bar">
      <RouterLink
          to="/app/dashboard"
          class="text-2xl font-semibold tracking-[0.3em]
               text-brand-primary hover:text-brand-primaryHover
               dark:text-brand-primary dark:hover:text-brand-primaryHover"
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
