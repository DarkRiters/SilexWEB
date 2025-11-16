<template>
  <div class="space-y-1.5">
    <label
        v-if="label"
        :for="id"
        class="block text-xs font-medium text-slate-700 dark:text-slate-200"
    >
      {{ label }}
    </label>

    <input
        :id="id"
        :type="type"
        :name="name"
        :autocomplete="autocomplete"
        class="w-full rounded-lg border px-3 py-2 text-sm
             border-slate-300 bg-white text-slate-900
             dark:border-slate-600 dark:bg-slate-900 dark:text-slate-100
             focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500
             placeholder:text-slate-400 dark:placeholder:text-slate-500"
        :placeholder="placeholder"
        :value="modelValue"
        @input="onInput"
    />

    <p
        v-if="error"
        class="text-xs text-red-500"
    >
      {{ error }}
    </p>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  id?: string;
  label?: string;
  name?: string;
  type?: string;
  placeholder?: string;
  autocomplete?: string;
  modelValue: string;
  error?: string;
}>();

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void;
}>();

function onInput(event: Event) {
  const target = event.target as HTMLInputElement;
  emit('update:modelValue', target.value);
}
</script>
