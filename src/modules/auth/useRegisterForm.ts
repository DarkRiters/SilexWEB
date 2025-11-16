import { useForm } from './useForm';
import {
    validateEmail,
    validatePassword,
    validatePasswordConfirm,
    type ValidationErrors,
} from './validators';

export interface RegisterFormValues {
    email: string;
    password: string;
    confirmPassword: string;
}

export function useRegisterForm() {
    return useForm<RegisterFormValues>({
        initialValues: {
            email: '',
            password: '',
            confirmPassword: '',
        },
        validate(values): ValidationErrors {
            return {
                email: validateEmail(values.email),
                password: validatePassword(values.password),
                confirmPassword: validatePasswordConfirm(
                    values.password,
                    values.confirmPassword,
                ),
            };
        },
        // submitRequest: async (values) => { await authApi.register(values); },
    });
}
