<template>
  <AuthForm
      :title="t('auth.login.title')"
      :subtitle="t('auth.login.subtitle')"
      :submitLabel="t('auth.login.submit')"
      :loadingLabel="t('auth.common.loading')"
      :fields="fields"
      :values="values"
      :errors="errors"
      :isSubmitting="isSubmitting"
      :onSubmit="onSubmit"
  >
    <template #footer>
      <div class="flex flex-col gap-2 ui-settings-footer-text">
        <RouterLink
            to="/auth/forgot-password"
            class="ui-btn-link"
        >
          {{ t('auth.login.forgotPassword') }}
        </RouterLink>

        <p>
          {{ t('auth.login.noAccount') }}
          <RouterLink
              to="/auth/register"
              class="ui-btn-link"
          >
            {{ t('auth.login.goToRegister') }}
          </RouterLink>
        </p>
      </div>
    </template>
  </AuthForm>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useRouter, RouterLink } from 'vue-router';

import AuthForm from '../../components/auth/AuthForm.vue';
import AuthField from '../../components/auth/AuthField.vue';
import AuthPasswordField from '../../components/auth/AuthPasswordField.vue';

import { useLoginForm } from '../../modules/auth/useLoginForm';
import { useI18n } from '../../composables/useI18n';

const router = useRouter();
const { t } = useI18n();
const { values, errors, isSubmitting, submit } = useLoginForm();

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
      autocomplete: 'current-password',
      label: t('auth.fields.password'),
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
