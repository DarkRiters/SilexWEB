<template>
  <div
      class="w-56 rounded-xl border border-slate-200 bg-white dark:bg-slate-800 dark:border-slate-700 shadow-lg px-3 py-3 text-xs space-y-3"
  >
    <SettingsThemeSection />
    <SettingsLocaleSection />
    <SettingsProfileSection />
  </div>
</template>

<script setup lang="ts">
import SettingsThemeSection from './SettingsThemeSection.vue';
import SettingsLocaleSection from './SettingsLocaleSection.vue';
import SettingsProfileSection from "./SettingsProfileSection.vue";
</script>
