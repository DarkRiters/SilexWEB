<template>
  <div class="ui-card w-56 px-3 py-3 text-xs space-y-3">
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
