<template>
  <AuthForm
      :title="t('auth.register.title')"
      :subtitle="t('auth.register.subtitle')"
      :submitLabel="t('auth.register.submit')"
      :loadingLabel="t('auth.common.loading')"
      :fields="fields"
      :values="values"
      :errors="errors"
      :isSubmitting="isSubmitting"
      :onSubmit="onSubmit"
  >
    <template #footer>
      <p class="ui-settings-footer-text">
        {{ t('auth.register.haveAccount') }}
        <RouterLink
            to="/auth/login"
            class="ui-btn-link"
        >
          {{ t('auth.register.goToLogin') }}
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
import AuthPasswordField from '../../components/auth/AuthPasswordField.vue';

import { useRegisterForm } from '../../modules/auth/useRegisterForm';
import { useI18n } from '../../composables/useI18n';

const router = useRouter();
const { t } = useI18n();
const { values, errors, isSubmitting, submit } = useRegisterForm();

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
  {
    id: 'password',
    component: AuthPasswordField,
    model: 'password',
    props: {
      id: 'password',
      name: 'password',
      autocomplete: 'new-password',
      label: t('auth.fields.password'),
      placeholder: t('auth.placeholders.password'),
    },
  },
  {
    id: 'confirmPassword',
    component: AuthPasswordField,
    model: 'confirmPassword',
    props: {
      id: 'confirmPassword',
      name: 'confirmPassword',
      autocomplete: 'new-password',
      label: t('auth.fields.confirmPassword'),
      placeholder: t('auth.placeholders.password'),
    },
  },
]);

async function onSubmit() {
  await submit(async () => {
    await router.push('/app/dashboard');
  });
}
</script>
