<template>
  <div class="pt-2 border-t border-slate-200 dark:border-slate-700">
    <p class="mb-1 font-semibold text-slate-800 dark:text-slate-100">
      {{ t('settings.profile.title') }}
    </p>

    <div class="flex flex-col gap-2 text-xs">
      <RouterLink
          to="/app/profile"
          class="inline-flex items-center justify-center rounded-full border border-slate-300 px-2 py-1
               text-slate-700 dark:text-slate-100 dark:border-slate-600
               hover:border-sky-500 hover:text-sky-600 dark:hover:text-sky-400 dark:hover:border-sky-400
               transition"
      >
        {{ t('settings.profile.open') }}
      </RouterLink>
    </div>
  </div>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router';
import { useI18n } from '../../../composables/useI18n.ts';

const { t } = useI18n();
</script>
