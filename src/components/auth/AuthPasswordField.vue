<template>
  <div class="space-y-1.5">
    <label
        v-if="label"
        :for="id"
        class="ui-label"
    >
      {{ label }}
    </label>

    <div class="relative">
      <input
          :id="id"
          :type="isVisible ? 'text' : 'password'"
          :name="name"
          :autocomplete="autocomplete"
          class="ui-input-password"
          :placeholder="placeholder"
          :value="modelValue"
          @input="onInput"
      />

      <button
          type="button"
          class="absolute inset-y-0 right-0 px-2 text-xs text-text-muted-light
                 dark:text-text-muted-dark hover:text-text-main-light
                 dark:hover:text-text-main-dark transition"
          @click="toggle"
      >
        {{ isVisible ? t('auth.fields.hidePassword') : t('auth.fields.showPassword') }}
      </button>
    </div>

    <p v-if="error" class="ui-error-text">
      {{ t(error) }}
    </p>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import type { MessageKey } from '../../i18n/messages';
import { useI18n } from '../../composables/useI18n';

const { t } = useI18n();

defineProps<{
  id?: string;
  label?: string;
  name?: string;
  placeholder?: string;
  autocomplete?: string;
  modelValue: string;
  error?: MessageKey;
}>();

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void;
}>();

const isVisible = ref(false);

function toggle() {
  isVisible.value = !isVisible.value;
}

function onInput(event: Event) {
  const target = event.target as HTMLInputElement;
  emit('update:modelValue', target.value);
}
</script>
