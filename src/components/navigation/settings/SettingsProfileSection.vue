<template>
  <div class="pt-2 border-t border-border-soft dark:border-border-dark">
    <p class="ui-section-title">
      {{ t('settings.profile.title') }}
    </p>

    <div class="flex flex-col gap-2 text-xs">
      <RouterLink
          to="/app/profile"
          class="ui-btn-outline-pill"
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
