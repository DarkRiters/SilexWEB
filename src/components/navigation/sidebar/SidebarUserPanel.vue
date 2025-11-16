<template>
  <div class="relative">
    <div
        v-if="!collapsed"
        class="ui-sidebar-user-card flex flex-col gap-3"
    >
      <div class="flex items-center justify-between gap-3">
        <div class="flex items-center gap-3">
          <div class="w-9 h-9 ui-avatar-circle text-xs">
            :)
          </div>

          <p class="text-sm font-semibold text-text-main-light dark:text-text-main-dark">
            {{ greeting }}
          </p>
        </div>

        <div class="flex items-center gap-3 text-xl text-text-main-light dark:text-text-main-dark">
          <button
              type="button"
              class="hover:text-brand-primary dark:hover:text-brand-primaryHover transition"
          >
            🔔
          </button>
          <button
              type="button"
              class="hover:text-brand-primary dark:hover:text-brand-primaryHover transition"
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
            class="ui-btn-link"
        >
          {{ t('userPanel.login') }}
        </RouterLink>

        <button
            v-else
            type="button"
            class="text-xs text-text-muted-light dark:text-text-muted-dark hover:text-red-500 dark:hover:text-red-400 transition"
            @click="handleLogout"
        >
          {{ t('userPanel.logout') }}
        </button>
      </div>
    </div>

    <div
        v-else
        class="ui-sidebar-user-compact text-text-main-light dark:text-text-main-dark"
    >
      <div class="w-6 h-6 ui-avatar-circle text-[10px]">
        :)
      </div>

      <button
          type="button"
          class="hover:text-brand-primary dark:hover:text-brand-primaryHover transition"
      >
        🔔
      </button>

      <button
          type="button"
          class="hover:text-brand-primary dark:hover:text-brand-primaryHover transition"
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
