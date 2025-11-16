<template>
  <div>
    <p class="mb-1 font-semibold text-slate-800 dark:text-slate-100">
      {{ t('settings.theme.title') }}
    </p>
    <div class="flex gap-2">
      <SettingsToggleButton
          :active="theme === 'light'"
          @click="setTheme('light')"
      >
        {{ t('settings.theme.light') }}
      </SettingsToggleButton>

      <SettingsToggleButton
          :active="theme === 'dark'"
          @click="setTheme('dark')"
      >
        {{ t('settings.theme.dark') }}
      </SettingsToggleButton>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useTheme } from '../../../composables/useTheme';
import { useI18n } from '../../../composables/useI18n';
import SettingsToggleButton from './SettingsToggleButton.vue';

const { theme, setTheme } = useTheme();
const { t } = useI18n();
</script>
