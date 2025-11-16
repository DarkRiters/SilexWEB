<template>
  <div class="ui-page-auth">
    <div class="ui-card-auth">
      <header class="space-y-1">
        <h1 class="ui-title-lg">
          {{ title }}
        </h1>

        <p v-if="subtitle" class="ui-text-muted">
          {{ subtitle }}
        </p>
      </header>

      <main class="space-y-4">
        <slot />
      </main>

      <footer
          v-if="$slots.footer"
          class="pt-2 border-t border-border-soft dark:border-border-dark"
      >
        <slot name="footer" />
      </footer>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  title: string;
  subtitle?: string;
}>();
</script>
