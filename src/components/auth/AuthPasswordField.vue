<template>
  <div class="space-y-1.5">
    <label
        v-if="label"
        :for="id"
        class="block text-xs font-medium text-slate-700 dark:text-slate-200"
    >
      {{ label }}
    </label>

    <div class="relative">
      <input
          :id="id"
          :type="isVisible ? 'text' : 'password'"
          :name="name"
          :autocomplete="autocomplete"
          class="w-full rounded-lg border px-3 py-2 pr-9 text-sm
               border-slate-300 bg-white text-slate-900
               dark:border-slate-600 dark:bg-slate-900 dark:text-slate-100
               focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500
               placeholder:text-slate-400 dark:placeholder:text-slate-500"
          :placeholder="placeholder"
          :value="modelValue"
          @input="onInput"
      />

      <button
          type="button"
          class="absolute inset-y-0 right-0 px-2 text-xs text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-300"
          @click="toggle"
      >
        {{ isVisible ? t('auth.fields.hidePassword') : t('auth.fields.showPassword') }}
      </button>
    </div>

    <p
        v-if="error"
        class="text-xs text-red-500"
    >
      {{ error }}
    </p>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import {useI18n} from "../../composables/useI18n.ts";
const { t } = useI18n();

defineProps<{
  id?: string;
  label?: string;
  name?: string;
  placeholder?: string;
  autocomplete?: string;
  modelValue: string;
  error?: string;
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
