import { ref, computed } from 'vue';
import { validateEmail, type ValidationErrors } from './validators';

export interface ForgotPasswordFormValues {
    email: string;
}

export function useForgotPasswordForm() {
    const values = ref<ForgotPasswordFormValues>({
        email: '',
    });

    const errors = ref<ValidationErrors>({});
    const isSubmitting = ref(false);
    const isValid = computed(() => !errors.value.email);

    function validate(): boolean {
        const current = values.value;

        const nextErrors: ValidationErrors = {
            email: validateEmail(current.email),
        };

        errors.value = nextErrors;
        return !nextErrors.email;
    }

    async function submit(onSuccess?: () => Promise<void> | void) {
        if (!validate()) return;

        try {
            isSubmitting.value = true;

            // TODO: tu podepniesz API wysyłki maila resetującego hasło
            await new Promise((resolve) => setTimeout(resolve, 500));

            if (onSuccess) {
                await onSuccess();
            }
        } finally {
            isSubmitting.value = false;
        }
    }

    return {
        values,
        errors,
        isSubmitting,
        isValid,

        validate,
        submit,
    };
}
