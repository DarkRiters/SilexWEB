export interface ValidationErrors {
    [key: string]: string | undefined;
}

export function validateEmail(email: string): string | undefined {
    if (!email.trim()) return 'auth.errors.email.required';
    const re = /\S+@\S+\.\S+/;
    if (!re.test(email)) return 'auth.errors.email.invalid';
    return undefined;
}

export function validatePassword(password: string): string | undefined {
    if (!password.trim()) return 'auth.errors.password.required';
    if (password.length < 8) return 'auth.errors.password.tooShort';
    return undefined;
}

export function validateRequired(value: string, key: string): string | undefined {
    if (!value.trim()) return key;
    return undefined;
}

export function validatePasswordConfirm(
    password: string,
    confirmPassword: string,
): string | undefined {
    if (!confirmPassword.trim()) return 'auth.errors.confirmPassword.required';
    if (confirmPassword !== password) return 'auth.errors.confirmPassword.mismatch';
    return undefined;
}
