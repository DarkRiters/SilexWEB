import { computed, ref } from 'vue';
import type { ValidationErrors } from './validators';

interface UseFormOptions<TValues> {
    initialValues: TValues;
    validate: (values: TValues) => ValidationErrors;
    submitRequest?: (values: TValues) => Promise<void>;
}

export function useForm<TValues>(options: UseFormOptions<TValues>) {
    const values = ref<TValues>(options.initialValues);
    const errors = ref<ValidationErrors>({});
    const isSubmitting = ref(false);

    const isValid = computed(() =>
        Object.values(errors.value).every((err) => !err),
    );

    function validate(): boolean {
        const nextErrors = options.validate(values.value);
        errors.value = nextErrors;
        return Object.values(nextErrors).every((err) => !err);
    }

    async function submit(onSuccess?: () => Promise<void> | void) {
        if (!validate()) return;

        try {
            isSubmitting.value = true;

            if (options.submitRequest) {
                await options.submitRequest(values.value);
            } else {
                await new Promise((resolve) => setTimeout(resolve, 300));
            }

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
