<template>
  <aside
      :class="[
      ui.sidebarOpen ? 'w-72' : 'w-16',
      'ui-sidebar'
    ]"
  >
    <button
        type="button"
        @click="ui.toggleSidebar"
        class="ui-sidebar-toggle"
    >
      <span v-if="ui.sidebarOpen">«</span>
      <span v-else>»</span>
    </button>

    <div class="ui-sidebar-header">
      <RouterLink
          to="/app/dashboard"
          class="text-3xl font-semibold tracking-[0.3em]
               text-brand-primary hover:text-brand-primaryHover
               dark:text-brand-primary dark:hover:text-brand-primaryHover"
      >
        <span v-if="ui.sidebarOpen">SIŁEX</span>
        <span v-else>S</span>
      </RouterLink>
    </div>

    <div class="flex-1 px-2 py-4">
      <p
          v-if="ui.sidebarOpen"
          class="text-xs text-text-muted-light dark:text-text-muted-dark"
      >
        (lista treningów z API)
      </p>
    </div>

    <div class="ui-sidebar-footer">
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
