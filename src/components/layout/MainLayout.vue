<template>
  <div class="flex min-h-screen bg-slate-100 dark:bg-slate-900">
    <Sidebar />

    <main class="flex-1 bg-slate-50 dark:bg-slate-900">
      <RouterView />
    </main>
  </div>
</template>

<script setup lang="ts">
import { RouterView } from 'vue-router';
import Sidebar from "../navigation/sidebar/Sidebar.vue";
</script>
