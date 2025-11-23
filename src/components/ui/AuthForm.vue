<template>
  <AuthNavbar/>
  <div class="min-h-screen flex items-center justify-center">
    <div class="px-6 py-6 app-surface space-y-4">
      <h1 class="text-center"> {{title}}</h1>
      <form
          class="space-y-4" @submit.prevent="onSubmit">
        <slot/>
        <div>
          <slot name="actions"/>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import AuthNavbar from "../layout/AuthNavbar.vue";

defineProps<{
  title: string;
  onSubmit: () => void;
}>()
</script>
