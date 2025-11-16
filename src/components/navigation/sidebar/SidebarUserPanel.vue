<template>
  <div class="relative">
    <div
        v-if="!collapsed"
        class="rounded-2xl border border-slate-200 dark:border-slate-700
             bg-white dark:bg-slate-900
             px-4 py-3 shadow-sm flex flex-col gap-3"
    >
      <div class="flex items-center justify-between gap-3">
        <div class="flex items-center gap-3">
          <div
              class="w-9 h-9 rounded-full
                   bg-slate-200 text-slate-500
                   dark:bg-slate-700 dark:text-slate-300
                   flex items-center justify-center text-xs"
          >
            :)
          </div>

          <p class="text-sm font-semibold text-slate-900 dark:text-slate-50">
            {{ greeting }}
          </p>
        </div>

        <div class="flex items-center gap-3 text-xl text-slate-700 dark:text-slate-100">
          <button
              type="button"
              class="hover:text-sky-600 dark:hover:text-sky-400 transition"
          >
            🔔
          </button>
          <button
              type="button"
              class="hover:text-sky-600 dark:hover:text-sky-400 transition"
              @click="toggleSettings"
          >
            ⚙️
          </button>
        </div>
      </div>

      <div class="flex gap-3 text-xs">
        <RouterLink
            v-if="!auth.isLoggedIn"
            to="/auth/login"
            class="text-sky-600 hover:text-sky-500 dark:text-sky-400 dark:hover:text-sky-300"
        >
          {{ t('userPanel.login') }}
        </RouterLink>

        <button
            v-else
            type="button"
            class="text-slate-500 hover:text-red-500 dark:text-slate-400 dark:hover:text-red-400 transition"
            @click="handleLogout"
        >
          {{ t('userPanel.logout') }}
        </button>
      </div>
    </div>

    <div
        v-else
        class="h-24 w-10 rounded-full border border-slate-200 dark:border-slate-700
             bg-white dark:bg-slate-900
             flex flex-col items-center justify-center gap-2
             text-slate-700 dark:text-slate-100 text-xs"
    >
      <div
          class="w-6 h-6 rounded-full
               bg-slate-200 text-slate-500
               dark:bg-slate-700 dark:text-slate-300
               flex items-center justify-center text-[10px]"
      >
        :)
      </div>

      <button
          type="button"
          class="hover:text-sky-600 dark:hover:text-sky-400 transition"
      >
        🔔
      </button>

      <button
          type="button"
          class="hover:text-sky-600 dark:hover:text-sky-400 transition"
          @click="toggleSettings"
      >
        ⚙️
      </button>
    </div>

    <div
        v-if="settingsOpen"
        :class="[
        'absolute z-20',
        collapsed
          ? 'left-full bottom-0 ml-2'
          : 'right-0 bottom-full mb-3'
      ]"
    >
      <UserSettingsMenu />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import { RouterLink, useRouter } from 'vue-router';
import UserSettingsMenu from '../settings/UserSettingsMenu.vue';
import { useI18n } from '../../../composables/useI18n';
import { useAuthStore } from '../../../stores/authStore';

const props = withDefaults(defineProps<{
  userName?: string | null;
  collapsed?: boolean;
}>(), {
  collapsed: false,
});

const { t } = useI18n();
const router = useRouter();
const auth = useAuthStore();

const greeting = computed(() => {
  const name = props.userName?.trim();
  if (name && name.length > 0) {
    return t('userPanel.greeting.withName', { name });
  }
  return t('userPanel.greeting.noName');
});

const settingsOpen = ref(false);

function toggleSettings() {
  settingsOpen.value = !settingsOpen.value;
}

async function handleLogout() {
  auth.logout();
  await router.push('/auth/login');
}
</script>
