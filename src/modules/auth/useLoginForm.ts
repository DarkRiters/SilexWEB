import {useForm} from "./useForm.ts";
import {validateEmail, validatePassword, type ValidationErrors} from "./validators.ts";

export interface LoginFormValues {
    email: string;
    password: string;
}

export function useLoginForm() {
    const form = useForm<LoginFormValues>({
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
        // submitRequest: async (values) => {
        //   await authApi.login(values);
        // },
    });

    return form;
}
