<template>
  <div class="flex flex-col">
    <label :for="id" class="mb-1">
      {{ label }}
    </label>

    <input
        :id="id"
        :type="type"
        :placeholder="placeholder"
        class="px-3 py-2 app-input"
        :value="modelValue"
        @input="onInput"
    />
    <p v-if="error" class="text-red-600">
      {{error}}
    </p>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  id: string;
  label: string;
  type: string;
  placeholder: string;
  modelValue: string;
  error?: string;
}>();

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void;
}>();

function onInput(e: Event) {
  const target = e.target as HTMLInputElement;
  emit('update:modelValue', target.value);
}
</script>
