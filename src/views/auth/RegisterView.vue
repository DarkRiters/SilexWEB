<!-- src/views/auth/RegisterView.vue -->
<template>
  <AuthCard
      :title="t('auth.register.title')"
      :subtitle="t('auth.register.subtitle')"
  >
    <form
        class="space-y-4"
        @submit.prevent="onSubmit"
    >
      <AuthField
          id="email"
          name="email"
          type="email"
          autocomplete="email"
          :label="t('auth.fields.email')"
          :placeholder="t('auth.placeholders.email')"
          v-model="values.email"
          :error="errors.email"
      />

      <AuthPasswordField
          id="password"
          name="password"
          autocomplete="new-password"
          :label="t('auth.fields.password')"
          :placeholder="t('auth.placeholders.password')"
          v-model="values.password"
          :error="errors.password"
      />

      <AuthPasswordField
          id="confirmPassword"
          name="confirmPassword"
          autocomplete="new-password"
          :label="t('auth.fields.confirmPassword')"
          :placeholder="t('auth.placeholders.password')"
          v-model="values.confirmPassword"
          :error="errors.confirmPassword"
      />

      <button
          type="submit"
          class="w-full mt-2 inline-flex items-center justify-center rounded-lg px-3 py-2 text-sm font-medium
               bg-sky-600 text-white hover:bg-sky-700
               disabled:opacity-60 disabled:cursor-not-allowed
               transition"
          :disabled="isSubmitting"
      >
        <span v-if="!isSubmitting">
          {{ t('auth.register.submit') }}
        </span>
        <span v-else>
          {{ t('auth.common.loading') }}
        </span>
      </button>
    </form>

    <template #footer>
      <p class="text-xs text-slate-500 dark:text-slate-400">
        {{ t('auth.register.haveAccount') }}
        <RouterLink
            to="/auth/login"
            class="text-sky-600 hover:text-sky-500 dark:text-sky-400 dark:hover:text-sky-300 font-medium"
        >
          {{ t('auth.register.goToLogin') }}
        </RouterLink>
      </p>
    </template>
  </AuthCard>
</template>

<script setup lang="ts">
import { useRouter, RouterLink } from 'vue-router';
import { useRegisterForm } from '../../modules/auth/useRegisterForm';
import { useI18n } from '../../composables/useI18n';
import AuthPasswordField from '../../components/auth/AuthPasswordField.vue';
import AuthField from '../../components/auth/AuthField.vue';
import AuthCard from '../../components/auth/AuthCard.vue';

const router = useRouter();
const { t } = useI18n();
const { values, errors, isSubmitting, submit } = useRegisterForm();

async function onSubmit() {
  await submit(async () => {
    await router.push('/app/dashboard');
  });
}
</script>
