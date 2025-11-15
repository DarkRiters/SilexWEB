<template>
  <div class="flex min-h-screen bg-slate-100 dark:bg-slate-900">
    <aside
        class="w-72 border-r border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 flex flex-col"
    >
      <div class="py-6 px-6 border-b border-slate-200 dark:border-slate-700">
        <RouterLink
            to="/app/dashboard"
            class="h-full flex items-center justify-center text-3xl font-semibold tracking-[0.3em] text-sky-600 hover:text-sky-700 dark:text-sky-400 dark:hover:text-sky-300"
        >
          SIŁEX
        </RouterLink>
      </div>

      <div class="flex-1 px-4 py-4">
        <p class="text-xs text-slate-400 dark:text-slate-500">
          (lista treningów z API)
        </p>
      </div>

      <div class="px-4 py-6 border-t border-slate-200 dark:border-slate-700">
        <SidebarUserPanel />
      </div>
    </aside>

    <main class="flex-1 bg-slate-50 dark:bg-slate-900">
      <RouterView />
    </main>
  </div>
</template>

<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router';
import SidebarUserPanel from "./SidebarUserPanel.vue";
</script>
