<template>
  <header class="w-full flex items-center justify-between px-6 py-3  app-nav">
    <BaseLogo/>
    <nav class="flex gap-4">
      <RouterLink
          to="/login"
      >
        {{ t('auth.login.title') }}
      </RouterLink>
      <RouterLink
          to="/register"
      >
        {{ t('auth.register.title') }}
      </RouterLink>
      <RouterLink
          to="/forgot-password"
      >
        {{ t('auth.forgot.title') }}
      </RouterLink>
    </nav>
    <div class="flex gap-4">
      <button
          @click="toggleTheme"
          class="px-2 py-1 rounded-xl app-surface"
      >
        {{ theme === 'dark' ? '🌙' : '☀️' }}
      </button>
      <button
          @click="setLocale(locale === 'pl' ? 'en' : 'pl')"
          class="px-2 py-1 rounded-xl app-surface"
      >
        {{ locale === 'pl' ? 'PL' : 'EN' }}
      </button>
    </div>
  </header>
</template>

<script setup lang="ts">

import {useTheme} from "../composables/useTheme.ts";
import {useLocale} from "../composables/useLocale.ts";
import {useI18n} from "../composables/useI18n.ts";
import BaseLogo from "../ui/BaseLogo.vue";

const {theme, toggleTheme} = useTheme();
const {locale, setLocale} = useLocale();
const {t} = useI18n();
</script>