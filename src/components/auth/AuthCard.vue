<template>
  <div
      class="min-h-screen flex items-center justify-center bg-slate-100 dark:bg-slate-900 px-4"
  >
    <div
        class="w-full max-w-md rounded-2xl border border-slate-200 dark:border-slate-700
             bg-white dark:bg-slate-800 shadow-xl p-6 space-y-6"
    >
      <header class="space-y-1">
        <h1 class="text-xl font-semibold text-slate-900 dark:text-slate-50">
          {{ title }}
        </h1>
        <p
            v-if="subtitle"
            class="text-xs text-slate-500 dark:text-slate-400"
        >
          {{ subtitle }}
        </p>
      </header>

      <main class="space-y-4">
        <slot />
      </main>

      <footer v-if="$slots.footer" class="pt-2 border-t border-slate-100 dark:border-slate-700">
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
