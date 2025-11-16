<template>
  <div class="ui-main-shell">
    <Sidebar />

    <main class="ui-main-content">
      <RouterView />
    </main>
  </div>
</template>

<script setup lang="ts">
import { RouterView } from 'vue-router';
import Sidebar from "../navigation/sidebar/Sidebar.vue";
</script>
