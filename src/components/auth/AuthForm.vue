<template>
  <AuthCard :title="title" :subtitle="subtitle">
    <form class="space-y-4" @submit.prevent="onSubmit" novalidate>
      <component
          v-for="field in fields"
          :key="field.id"
          :is="field.component"
          v-bind="field.props"
          v-model="values[field.model]"
          :error="errors[field.model]"
      />

      <button
          type="submit"
          class="ui-btn-primary"
          :disabled="isSubmitting"
      >
        <span v-if="!isSubmitting">
          {{ submitLabel }}
        </span>
        <span v-else>
          {{ loadingLabel }}
        </span>
      </button>
    </form>

    <template #footer>
      <slot name="footer" />
    </template>
  </AuthCard>
</template>

<script setup lang="ts">
import AuthCard from './AuthCard.vue';
import type { MessageKey } from '../../i18n/messages';

defineProps<{
  title: string;
  subtitle: string;
  submitLabel: string;
  loadingLabel: string;
  fields: Array<{
    id: string;
    component: any;
    model: string;
    props?: Record<string, any>;
  }>;
  values: Record<string, any>;
  errors: Record<string, MessageKey | undefined>;
  isSubmitting: boolean;
  onSubmit: () => void | Promise<void>;
}>();
</script>
