<template>
  <div class="space-y-1.5">
    <label
        v-if="label"
        :for="id"
        class="ui-label"
    >
      {{ label }}
    </label>

    <input
        :id="id"
        :type="type"
        :name="name"
        :autocomplete="autocomplete"
        class="ui-input"
        :placeholder="placeholder"
        :value="modelValue"
        @input="onInput"
    />

    <p v-if="error" class="ui-error-text">
      {{ t(error) }}
    </p>
  </div>
</template>

<script setup lang="ts">
import type { MessageKey } from '../../i18n/messages';
import { useI18n } from '../../composables/useI18n';

const { t } = useI18n();

defineProps<{
  id?: string;
  label?: string;
  name?: string;
  type?: string;
  placeholder?: string;
  autocomplete?: string;
  modelValue: string;
  error?: MessageKey;
}>();

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void;
}>();

function onInput(event: Event) {
  const target = event.target as HTMLInputElement;
  emit('update:modelValue', target.value);
}
</script>
