<template>
  <div class="min-h-screen flex app-nav">
    <SideNavbar />

    <main class="flex-1 px-6 py-6 overflow-y-auto">
      <div class="max-w-3xl mx-auto space-y-4">
        <div class="app-surface rounded-2xl px-6 py-4">
          <span class="text-lg font-semibold">
            {{ t('settings.profile.title') || 'Profil' }}
          </span>
        </div>

        <div class="app-surface rounded-2xl px-6 py-4">
          <form class="space-y-4" @submit.prevent="onSubmit">
            <BaseInput
                id="name"
                :label="t('auth.fields.name')"
                type="text"
                :placeholder="t('auth.fields.name')"
                v-model="name"
            />

            <BaseInput
                id="email"
                :label="t('auth.fields.email')"
                type="email"
                :placeholder="t('auth.placeholders.email')"
                v-model="email"
                :error="emailError ? t(emailError) : ''"
            />

            <div class="flex justify-end">
              <BaseButton
                  type="submit"
                  class="bg-green-600 hover:bg-green-500"
              >
                {{ t('settings.profile.save') }}
              </BaseButton>
            </div>
          </form>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

import SideNavbar from "../components/layout/SideNavbar.vue";
import BaseInput from "../components/ui/BaseInput.vue";
import BaseButton from "../components/ui/BaseButton.vue";
import { useI18n } from "../composables/useI18n.ts";
import type { MessageKey } from "../i18n/messages.ts";
import {authStore} from "../stores/AuthStore.ts";

const { t } = useI18n();

const auth = authStore();
const name = ref("");
const email = ref("");
const emailError = ref<MessageKey | null>(null);

async function onSubmit() {
  emailError.value = null;
  console.log("Zapis profilu:", { name: name.value, email: email.value });
  try {
    await auth.updateProfile(name.value, email.value);
    console.log("Zapisano profil:", {
      name: name.value,
      email: email.value,
    });
  } catch (e) {
    console.error("Błąd zapisu profilu", e);
  }
}
</script>
