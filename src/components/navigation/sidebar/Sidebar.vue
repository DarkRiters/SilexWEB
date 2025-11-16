<template>
  <aside
      :class="[
      ui.sidebarOpen ? 'w-72' : 'w-16',
      'relative border-r border-slate-200 dark:border-slate-700',
      'bg-white dark:bg-slate-900',
      'flex flex-col transition-all duration-300'
    ]"
  >
    <button
        type="button"
        @click="ui.toggleSidebar"
        class="absolute top-1/2 -right-3 -translate-y-1/2
             w-6 h-6 rounded-full
             bg-slate-300 text-slate-700 hover:bg-slate-400
             dark:bg-slate-700 dark:text-white dark:hover:bg-slate-500
             flex items-center justify-center shadow text-xs"
    >
      <span v-if="ui.sidebarOpen">«</span>
      <span v-else>»</span>
    </button>

    <div class="py-6 px-4 border-b border-slate-200 dark:border-slate-700 flex items-center justify-center">
      <RouterLink
          to="/app/dashboard"
          class="text-3xl font-semibold tracking-[0.3em]
               text-sky-600 hover:text-sky-700
               dark:text-sky-400 dark:hover:text-sky-300"
      >
        <span v-if="ui.sidebarOpen">SIŁEX</span>
        <span v-else>S</span>
      </RouterLink>
    </div>

    <div class="flex-1 px-2 py-4">
      <p
          v-if="ui.sidebarOpen"
          class="text-xs text-slate-400 dark:text-slate-500"
      >
        (lista treningów z API)
      </p>
    </div>

    <div class="px-2 py-4 border-t border-slate-200 dark:border-slate-700">
      <SidebarUserPanel :collapsed="!ui.sidebarOpen" />
    </div>
  </aside>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router';
import SidebarUserPanel from './SidebarUserPanel.vue';
import {useUiStore} from "../../../stores/uiStore.ts";

const ui = useUiStore();
</script>
