<template>
  <button
      type="button"
      :class="[
      'flex-1 rounded-full border px-2 py-1 text-xs',
      active
        ? 'border-sky-400 bg-sky-50 dark:bg-sky-900 text-sky-700 dark:text-sky-200'
        : 'border-slate-300 bg-white dark:bg-slate-700 dark:text-slate-100'
    ]"
      @click="$emit('click')"
  >
    <slot />
  </button>
</template>

<script setup lang="ts">
defineProps<{
  active: boolean;
}>();

defineEmits<{
  (e: 'click'): void;
}>();
</script>
