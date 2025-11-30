<template>
  <aside class="h-screen w-64 app-nav flex flex-col border-r">
    <div class="py-3 mb-4 border-b flex justify-center app-nav">
      <BaseLogo />
    </div>

    <div class="flex-1 overflow-y-auto py-2">
      <p class="text-xs text-gray-400">
        (lista treningów z API)
      </p>
    </div>

    <div class="px-3 py-4 app-nav">
      <div class="app-surface rounded-2xl px-4 py-3 text-xs space-y-3">
        <div class="flex items-center justify-between">
          <span>{{ userName }}</span>
          <BaseDropdown>
            <template #trigger>
              <button class="px-2 py-1 rounded-xl app-surface">
                ⚙️
              </button>
            </template>

            <div class="space-y-2 text-xs">
              <div class="flex items-center justify-between">
                <span>{{ t('settings.theme.title') }}</span>
                <button
                    @click="toggleTheme"
                    class="px-2 py-1 rounded-xl app-surface"
                >
                  {{ theme === 'dark' ? '🌙' : '☀️' }}
                </button>
              </div>

              <div class="flex items-center justify-between">
                <span>{{ t('settings.locale.title') }}</span>
                <button
                    @click="setLocale(locale === 'pl' ? 'en' : 'pl')"
                    class="px-2 py-1 rounded-xl app-surface"
                >
                  {{ locale === 'pl' ? 'PL' : 'EN' }}
                </button>
              </div>

              <div class="flex items-center justify-between">
                <RouterLink to="/profile">
                  <span>{{ t('settings.profile.open') }}</span>
                </RouterLink>
              </div>
            </div>
          </BaseDropdown>
        </div>
        <div class="app-footer" v-if="auth.isLoggedIn">
          <button type="submit" @click="onSubmit">
            {{t("userPanel.logout")}}
          </button>
        </div>
        <div v-else>
        <nav class="flex flex-col gap-1 app-footer">
          <RouterLink to="/login">{{t("userPanel.login")}}</RouterLink>
        </nav>
        </div>
      </div>
    </div>
  </aside>
</template>

<script setup lang="ts">
import { useTheme } from "../../composables/useTheme.ts";
import { useLocale } from "../../composables/useLocale.ts";
import { useI18n } from "../../composables/useI18n.ts";
import BaseLogo from "../ui/BaseLogo.vue";
import BaseDropdown from "../ui/BaseDropdown.vue";
import {authStore} from "../../stores/AuthStore.ts";
import {computed} from "vue";

const auth = authStore();
const { theme, toggleTheme } = useTheme();
const { locale, setLocale } = useLocale();
const { t } = useI18n();
const userName = computed(() =>
    auth.currentUser ? auth.currentUser.name : t("userPanel.greeting.noName")
);
function onSubmit () {
  auth.logout();
}
</script>
