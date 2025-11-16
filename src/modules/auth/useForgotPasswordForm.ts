import { useForm } from './useForm';
import { validateEmail, type ValidationErrors } from './validators';

export interface ForgotPasswordFormValues {
    email: string;
}

export function useForgotPasswordForm() {
    return useForm<ForgotPasswordFormValues>({
        initialValues: {
            email: '',
        },
        validate(values): ValidationErrors {
            return {
                email: validateEmail(values.email),
            };
        },
        // submitRequest: async (values) => { await authApi.forgotPassword(values); },
    });
}
