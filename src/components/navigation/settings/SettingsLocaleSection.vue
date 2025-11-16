<template>
  <div>
    <p class="mb-1 font-semibold text-slate-800 dark:text-slate-100">
      {{ t('settings.locale.title') }}
    </p>
    <div class="flex gap-2">
      <SettingsToggleButton
          :active="locale === 'pl'"
          @click="setLocale('pl')"
      >
        {{ t('settings.locale.pl') }}
      </SettingsToggleButton>

      <SettingsToggleButton
          :active="locale === 'en'"
          @click="setLocale('en')"
      >
        {{ t('settings.locale.en') }}
      </SettingsToggleButton>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useLocale } from '../../../composables/useLocale';
import { useI18n } from '../../../composables/useI18n';
import SettingsToggleButton from './SettingsToggleButton.vue';

const { locale, setLocale } = useLocale();
const { t } = useI18n();
</script>
