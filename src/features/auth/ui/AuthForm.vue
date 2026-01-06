<template>
  <AuthNavbar/>
  <div class="min-h-screen flex items-center justify-center">
    <div class="app-surface px-6 py-6 space-y-4 rounded-xl">
      <h1 class="text-center"> {{title}}</h1>
      <form
          class="space-y-4" @submit.prevent="onSubmit">
        <slot/>
        <div>
          <slot name="actions"/>
        </div>
        <div class="text-center app-footer">
          <slot name="footer" />
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import AuthNavbar from "../../../shared/layout/AuthNavbar.vue";

defineProps<{
  title: string;
  onSubmit: () => void | Promise<void>;
}>()
</script>
