import {useForm} from "./useForm.ts";
import {validateEmail, validatePassword, validatePasswordConfirm, type ValidationErrors} from "./validators.ts";

export interface RegisterFormValues {
    email: string;
    password: string;
    confirmPassword: string;
}

export function useRegisterForm() {
    const form = useForm<RegisterFormValues>({
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
        // submitRequest: async (values) => {
        //   await authApi.register(values);
        // },
    });

    return form;
}
