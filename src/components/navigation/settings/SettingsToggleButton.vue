<template>
  <button
      type="button"
      :class="[
        'ui-toggle-chip',
        active ? 'ui-toggle-chip-active' : 'ui-toggle-chip-inactive'
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
