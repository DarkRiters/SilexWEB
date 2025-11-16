const messages = {
    pl: {
        // SETTINGS - THEME
        'settings.theme.title': 'Motyw',
        'settings.theme.light': 'Jasny',
        'settings.theme.dark': 'Ciemny',

        // SETTINGS - LOCALE
        'settings.locale.title': 'Język',
        'settings.locale.pl': 'PL',
        'settings.locale.en': 'EN',

        // SETTINGS - PROFILE
        'settings.profile.title': 'Profil',
        'settings.profile.open': 'Otwórz profil',

        // USER PANEL
        'userPanel.greeting.noName': 'Witaj!',
        'userPanel.greeting.withName': 'Witaj {name}!',
        'userPanel.actionsHint': '(Wyloguj / profil)',
        'userPanel.login': 'Zaloguj się',
        'userPanel.logout': 'Wyloguj się',

        // AUTH – LOGIN
        'auth.login.title': 'Logowanie',
        'auth.login.subtitle': 'Zaloguj się, aby kontynuować.',
        'auth.login.forgotPassword': 'Nie pamiętasz hasła?',
        'auth.login.submit': 'Zaloguj się',
        'auth.login.noAccount': 'Nie masz konta?',
        'auth.login.goToRegister': 'Załóż konto',

        // AUTH – REGISTER
        'auth.register.title': 'Rejestracja',
        'auth.register.subtitle': 'Utwórz nowe konto.',
        'auth.register.submit': 'Zarejestruj się',
        'auth.register.haveAccount': 'Masz już konto?',
        'auth.register.goToLogin': 'Zaloguj się',

        // AUTH – FORGOT-PASSWORD
        'auth.forgot.title': 'Reset hasła',
        'auth.forgot.subtitle': 'Podaj email, na który wyślemy link do resetu hasła.',
        'auth.forgot.submit': 'Wyślij link resetujący',
        'auth.forgot.backInfo': 'Pamiętasz hasło?',
        'auth.forgot.goToLogin': 'Wróć do logowania',

        // AUTH - FIELDS
        'auth.fields.email': 'Email',
        'auth.fields.password': 'Hasło',
        'auth.fields.confirmPassword': 'Powtórz hasło',
        'auth.fields.showPassword': 'Pokaż',
        'auth.fields.hidePassword': 'Schowaj',

        // AUTH - PLACEHOLDERS
        'auth.placeholders.email': 'twoj.email@example.com',
        'auth.placeholders.password': '••••••••',

        // AUTH - COMMON
        'auth.common.loading': 'Przetwarzanie...',

        // AUTH – ERRORS
        'auth.errors.email.required': 'Email jest wymagany.',
        'auth.errors.email.invalid': 'Podaj poprawny adres email.',

        'auth.errors.password.required': 'Hasło jest wymagane.',
        'auth.errors.password.tooShort': 'Hasło musi mieć co najmniej 8 znaków.',

        'auth.errors.confirmPassword.required': 'Potwierdzenie hasła jest wymagane.',
        'auth.errors.confirmPassword.mismatch': 'Hasła muszą być takie same.',
    },

    en: {
        // SETTINGS - THEME
        'settings.theme.title': 'Theme',
        'settings.theme.light': 'Light',
        'settings.theme.dark': 'Dark',

        // SETTINGS - LOCALE
        'settings.locale.title': 'Language',
        'settings.locale.pl': 'PL',
        'settings.locale.en': 'EN',

        // SETTINGS - PROFILE
        'settings.profile.title': 'Profile',
        'settings.profile.open': 'Open profile',

        // USER PANEL
        'userPanel.greeting.noName': 'Welcome!',
        'userPanel.greeting.withName': 'Welcome, {name}!',
        'userPanel.actionsHint': '(Logout / profile)',
        'userPanel.login': 'Log in',
        'userPanel.logout': 'Log out',

        // AUTH – LOGIN
        'auth.login.title': 'Login',
        'auth.login.subtitle': 'Sign in to continue.',
        'auth.login.forgotPassword': 'Forgot your password?',
        'auth.login.submit': 'Sign in',
        'auth.login.noAccount': "Don't have an account?",
        'auth.login.goToRegister': 'Create one',

        // AUTH – REGISTER
        'auth.register.title': 'Register',
        'auth.register.subtitle': 'Create a new account.',
        'auth.register.submit': 'Sign up',
        'auth.register.haveAccount': 'Already have an account?',
        'auth.register.goToLogin': 'Sign in',

        // AUTH – FORGOT-PASSWORD
        'auth.forgot.title': 'Reset password',
        'auth.forgot.subtitle': 'Enter your email and we will send you a reset link.',
        'auth.forgot.submit': 'Send reset link',
        'auth.forgot.backInfo': 'Remember your password?',
        'auth.forgot.goToLogin': 'Back to login',

        // AUTH - FIELDS
        'auth.fields.email': 'Email',
        'auth.fields.password': 'Password',
        'auth.fields.confirmPassword': 'Confirm password',
        'auth.fields.showPassword': 'Show',
        'auth.fields.hidePassword': 'Hide',

        // AUTH - PLACEHOLDERS
        'auth.placeholders.email': 'your.email@example.com',
        'auth.placeholders.password': '••••••••',

        // AUTH - COMMON
        'auth.common.loading': 'Processing...',

        // AUTH – ERRORS
        'auth.errors.email.required': 'Email is required.',
        'auth.errors.email.invalid': 'Please enter a valid email address.',

        'auth.errors.password.required': 'Password is required.',
        'auth.errors.password.tooShort': 'Password must be at least 8 characters long.',

        'auth.errors.confirmPassword.required': 'Password confirmation is required.',
        'auth.errors.confirmPassword.mismatch': 'Passwords must match.',
    },
} as const;

type LocaleMessages = (typeof messages)['pl'];
export type MessageKey = keyof LocaleMessages;

export { messages };
