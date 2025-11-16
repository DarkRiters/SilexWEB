import { useForm } from './useForm';
import {
    validateEmail,
    validatePassword,
    type ValidationErrors,
} from './validators';

export interface LoginFormValues {
    email: string;
    password: string;
}

export function useLoginForm() {
    return useForm<LoginFormValues>({
        initialValues: {
            email: '',
            password: '',
        },
        validate(values): ValidationErrors {
            return {
                email: validateEmail(values.email),
                password: validatePassword(values.password),
            };
        },
        // submitRequest: async (values) => { await authApi.login(values); },
    });
}
