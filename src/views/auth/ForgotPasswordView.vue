<template>
  <AuthForm
      title="Odzyskiwanie konta"
      :onSubmit="onSubmit">
    <BaseInput
        id="email"
        label="Wpisz swój E-mail"
        type="email"
        placeholder="Wpisz e-mail"
        v-model="email"
    />
    <template #actions>
      <BaseButton type="submit" class="bg-red-600 hover:bg-red-500">Odzyskaj konto</BaseButton>
    </template>
  </AuthForm>
</template>
<script setup lang="ts">
import AuthForm from "../../components/ui/AuthForm.vue";
import {ref} from "vue";
import BaseInput from "../../components/ui/BaseInput.vue";
import BaseButton from "../../components/ui/BaseButton.vue";

const email = ref('');
function onSubmit() {
  console.log('Email:', email.value);
}
</script>

