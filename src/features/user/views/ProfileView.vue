<template>
  <div class="p-6 max-w-3xl mx-auto space-y-6">
    <div class="app-surface rounded-2xl p-6 space-y-4">
      <div class="flex items-center justify-between">
        <h1 class="text-lg font-semibold">{{ t("settings.profile.title") }}</h1>

        <button class="text-sm opacity-70 hover:opacity-100" @click="refresh">
          {{ t("common.refresh") }}
        </button>
      </div>

      <div v-if="profileError" class="rounded-xl p-3 border border-red-500/30 text-red-200">
        {{ t("common.error") }}: {{ profileError }}
      </div>

      <div v-if="profileSuccess" class="rounded-xl p-3 border border-green-500/30 text-green-200">
        {{ profileSuccess }}
      </div>

      <div class="space-y-3">
        <div>
          <label class="text-xs opacity-70">{{ t("auth.fields.name") }}</label>
          <input
              v-model="profileForm.name"
              class="mt-1 w-full rounded-xl px-3 py-2 app-surface border border-white/10"
              type="text"
          />
        </div>

        <div>
          <label class="text-xs opacity-70">{{ t("auth.fields.email") }}</label>
          <input
              v-model="profileForm.email"
              class="mt-1 w-full rounded-xl px-3 py-2 app-surface border border-white/10"
              type="email"
          />
        </div>

        <button
            class="w-full rounded-xl px-4 py-2 font-medium bg-green-600 hover:bg-green-500 disabled:opacity-50"
            :disabled="!canSaveProfile || isBusy"
            @click="saveProfile"
        >
          {{ isBusy ? t("common.loading") : t("settings.profile.save") }}
        </button>

        <button
            v-if="auth.isAdmin"
            class="w-full rounded-xl px-4 py-2 font-medium border border-white/10 hover:opacity-90"
            type="button"
            @click="openAdminPanel"
        >
          {{ t("admin.panel.open") }}
        </button>
      </div>
    </div>

    <div class="app-surface rounded-2xl p-6 space-y-4">
      <h2 class="text-lg font-semibold">{{ t("settings.password.title") }}</h2>

      <div v-if="passwordError" class="rounded-xl p-3 border border-red-500/30 text-red-200">
        {{ t("common.error") }}: {{ passwordError }}
      </div>

      <div v-if="passwordSuccess" class="rounded-xl p-3 border border-green-500/30 text-green-200">
        {{ passwordSuccess }}
      </div>

      <div class="space-y-3">
        <div>
          <label class="text-xs opacity-70">{{ t("settings.password.current") }}</label>
          <input
              v-model="passwordForm.currentPassword"
              class="mt-1 w-full rounded-xl px-3 py-2 app-surface border border-white/10"
              type="password"
              autocomplete="current-password"
          />
        </div>

        <div>
          <label class="text-xs opacity-70">{{ t("settings.password.new") }}</label>
          <input
              v-model="passwordForm.newPassword"
              class="mt-1 w-full rounded-xl px-3 py-2 app-surface border border-white/10"
              type="password"
              autocomplete="new-password"
          />
        </div>

        <div>
          <label class="text-xs opacity-70">{{ t("settings.password.confirm") }}</label>
          <input
              v-model="passwordForm.newPasswordConfirm"
              class="mt-1 w-full rounded-xl px-3 py-2 app-surface border border-white/10"
              type="password"
              autocomplete="new-password"
          />
        </div>

        <button
            class="w-full rounded-xl px-4 py-2 font-medium border border-white/10 hover:opacity-90 disabled:opacity-50"
            :disabled="!canChangePassword || isBusy"
            @click="changePassword"
        >
          {{ isBusy ? t("common.loading") : t("settings.password.submit") }}
        </button>
      </div>
    </div>

    <div class="app-surface rounded-2xl p-6 space-y-4">
      <div class="flex items-center justify-between">
        <h2 class="text-lg font-semibold">{{ t("settings.fitness.title") }}</h2>

        <button class="text-sm opacity-70 hover:opacity-100" @click="resetFitnessProfile" :disabled="isBusy">
          {{ t("settings.fitness.reset") }}
        </button>
      </div>

      <div class="text-sm opacity-70">
        {{ t("settings.fitness.info") }}
      </div>

      <div class="space-y-3">
        <div>
          <label class="text-xs opacity-70">{{ t("settings.fitness.weight") }}</label>
          <input
              v-model="fitnessForm.weightKg"
              class="mt-1 w-full rounded-xl px-3 py-2 app-surface border border-white/10"
              type="number"
              inputmode="numeric"
              min="30"
              max="250"
              step="1"
          />
        </div>

        <div>
          <label class="text-xs opacity-70">{{ t("settings.fitness.height") }}</label>
          <input
              v-model="fitnessForm.heightCm"
              class="mt-1 w-full rounded-xl px-3 py-2 app-surface border border-white/10"
              type="number"
              inputmode="numeric"
              min="120"
              max="230"
              step="1"
          />
        </div>

        <div>
          <label class="text-xs opacity-70">{{ t("settings.fitness.age") }}</label>
          <input
              v-model="fitnessForm.age"
              class="mt-1 w-full rounded-xl px-3 py-2 app-surface border border-white/10"
              type="number"
              inputmode="numeric"
              min="10"
              max="120"
              step="1"
          />
        </div>

        <button
            class="w-full rounded-xl px-4 py-2 font-medium bg-green-600 hover:bg-green-500 disabled:opacity-50"
            :disabled="!canSaveFitness || isBusy"
            @click="saveFitnessProfile"
        >
          {{ isBusy ? t("common.loading") : t("settings.fitness.save") }}
        </button>

        <div class="text-xs opacity-60">
          {{ t("settings.fitness.currentValues") }}
          <span class="opacity-90">
            {{ fitness.weightKg ?? "—" }} kg,
            {{ fitness.heightCm ?? "—" }} cm,
            {{ fitness.age ?? "—" }}
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, reactive, ref, watch } from "vue";
import { useI18n } from "../../../shared/composables/useI18n.ts";
import { useAuthStore } from "../../auth/stores/authStore.ts";
import { useProfileStore } from "../../../shared/stores/profileStore";
import {
  validateEmail,
  validateRequired,
  validatePasswordConfirm,
  validateCurrentPassword,
  validateNewPassword,
} from "../../auth/utils/validators.ts";

const { t } = useI18n();
const auth = useAuthStore();
const fitness = useProfileStore();

const isBusy = ref(false);

const profileError = ref<string | null>(null);
const profileSuccess = ref<string | null>(null);

const passwordError = ref<string | null>(null);
const passwordSuccess = ref<string | null>(null);

const profileForm = reactive({
  name: "",
  email: "",
});

const passwordForm = reactive({
  currentPassword: "",
  newPassword: "",
  newPasswordConfirm: "",
});

function hydrateProfile() {
  profileForm.name = auth.currentUser?.name ?? "";
  profileForm.email = auth.currentUser?.email ?? "";
}

async function refresh() {
  profileError.value = null;
  profileSuccess.value = null;

  try {
    isBusy.value = true;
    await auth.refreshMe();
    hydrateProfile();
    profileSuccess.value = t("settings.profile.refreshSuccess");
  } catch (e: any) {
    profileError.value = e?.message ?? t("settings.profile.refreshError");
  } finally {
    isBusy.value = false;
  }
}

const canSaveProfile = computed(() => {
  return profileForm.name.trim().length > 0 && profileForm.email.trim().length > 0;
});

async function saveProfile() {
  profileError.value = null;
  profileSuccess.value = null;

  const nameErr = validateRequired(profileForm.name, "auth.errors.email.required");
  const emailErr = validateEmail(profileForm.email);

  if (nameErr) {
    profileError.value = t("settings.profile.nameRequired");
    return;
  }
  if (emailErr) {
    profileError.value = t(emailErr);
    return;
  }

  try {
    isBusy.value = true;
    await auth.updateProfile(profileForm.name.trim(), profileForm.email.trim());
    profileSuccess.value = t("settings.profile.saveSuccess");
  } catch (e: any) {
    profileError.value = e?.message ?? t("settings.profile.saveError");
  } finally {
    isBusy.value = false;
  }
}

const canChangePassword = computed(() => {
  return (
      passwordForm.currentPassword.trim().length > 0 &&
      passwordForm.newPassword.trim().length > 0 &&
      passwordForm.newPasswordConfirm.trim().length > 0
  );
});

async function changePassword() {
  passwordError.value = null;
  passwordSuccess.value = null;

  const currErr = validateCurrentPassword(passwordForm.currentPassword);
  const newErr = validateNewPassword(passwordForm.newPassword);
  const confErr = validatePasswordConfirm(passwordForm.newPassword, passwordForm.newPasswordConfirm);

  if (currErr) {
    passwordError.value = t(currErr);
    return;
  }
  if (newErr) {
    passwordError.value = t(newErr);
    return;
  }
  if (confErr) {
    passwordError.value = t(confErr);
    return;
  }

  try {
    isBusy.value = true;
    await auth.changePassword({
      currentPassword: passwordForm.currentPassword,
      newPassword: passwordForm.newPassword,
      newPasswordConfirm: passwordForm.newPasswordConfirm,
    });

    passwordSuccess.value = t("settings.password.success");
    passwordForm.currentPassword = "";
    passwordForm.newPassword = "";
    passwordForm.newPasswordConfirm = "";
  } catch (e: any) {
    passwordError.value = e?.message ?? t("settings.password.error");
  } finally {
    isBusy.value = false;
  }
}

function openAdminPanel() {
  console.log("Admin panel open");
}

onMounted(() => {
  hydrateProfile();
});

watch(
    () => auth.currentUser,
    () => hydrateProfile(),
    { deep: true }
);

// ===== FITNESS PROFILE (LOCAL) =====
const fitnessForm = reactive({
  weightKg: (fitness.weightKg ?? "") as number | "",
  heightCm: (fitness.heightCm ?? "") as number | "",
  age: (fitness.age ?? "") as number | "",
});

watch(
    () => [fitness.weightKg, fitness.heightCm, fitness.age],
    () => {
      fitnessForm.weightKg = (fitness.weightKg ?? "") as number | "";
      fitnessForm.heightCm = (fitness.heightCm ?? "") as number | "";
      fitnessForm.age = (fitness.age ?? "") as number | "";
    }
);

function toNumberOrNull(v: number | ""): number | null {
  if (v === "") return null;
  const n = Number(v);
  if (!Number.isFinite(n)) return null;
  return Math.floor(n);
}

const canSaveFitness = computed(() => {
  const w = toNumberOrNull(fitnessForm.weightKg);
  const h = toNumberOrNull(fitnessForm.heightCm);
  const a = toNumberOrNull(fitnessForm.age);

  const anyProvided = w !== null || h !== null || a !== null;
  if (!anyProvided) return false;

  const okW = w === null || (w >= 30 && w <= 250);
  const okH = h === null || (h >= 120 && h <= 230);
  const okA = a === null || (a >= 10 && a <= 120);

  return okW && okH && okA;
});

function saveFitnessProfile() {
  const w = toNumberOrNull(fitnessForm.weightKg);
  const h = toNumberOrNull(fitnessForm.heightCm);
  const a = toNumberOrNull(fitnessForm.age);

  fitness.setWeightKg(w);
  fitness.setHeightCm(h);
  fitness.setAge(a);
}

function resetFitnessProfile() {
  fitness.reset();
  fitnessForm.weightKg = "";
  fitnessForm.heightCm = "";
  fitnessForm.age = "";
}
</script>
