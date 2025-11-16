<template>
  <AuthForm
      :title="t('auth.forgot.title')"
      :subtitle="t('auth.forgot.subtitle')"
      :submitLabel="t('auth.forgot.submit')"
      :loadingLabel="t('auth.common.loading')"
      :fields="fields"
      :values="values"
      :errors="errors"
      :isSubmitting="isSubmitting"
      :onSubmit="onSubmit"
  >
    <template #footer>
      <p class="ui-settings-footer-text">
        {{ t('auth.forgot.backInfo') }}
        <RouterLink
            to="/auth/login"
            class="ui-btn-link"
        >
          {{ t('auth.forgot.goToLogin') }}
        </RouterLink>
      </p>
    </template>
  </AuthForm>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useRouter, RouterLink } from 'vue-router';

import AuthForm from '../../components/auth/AuthForm.vue';
import AuthField from '../../components/auth/AuthField.vue';

import { useForgotPasswordForm } from '../../modules/auth/useForgotPasswordForm';
import { useI18n } from '../../composables/useI18n';

const router = useRouter();
const { t } = useI18n();
const { values, errors, isSubmitting, submit } = useForgotPasswordForm();

const fields = computed(() => [
  {
    id: 'email',
    component: AuthField,
    model: 'email',
    props: {
      id: 'email',
      name: 'email',
      type: 'email',
      autocomplete: 'email',
      label: t('auth.fields.email'),
      placeholder: t('auth.placeholders.email'),
    },
  },
]);

async function onSubmit() {
  await submit(async () => {
    await router.push('/auth/login');
  });
}
</script>
