import { useLocale } from './useLocale';
import { messages, type MessageKey } from '../i18n/messages';

function formatMessage(
    template: string,
    params?: Record<string, string | number>,
): string {
    if (!params) return template;

    return template.replace(/\{(\w+)\}/g, (_, key: string) => {
        const value = params[key];
        return value !== undefined ? String(value) : '';
    });
}

export function useI18n() {
    const { locale } = useLocale();

    function t(key: MessageKey, params?: Record<string, string | number>): string {
        const currentLocale = locale.value;
        const dict = messages[currentLocale] ?? messages.pl;
        const msg = dict[key] ?? key;

        return formatMessage(msg, params);
    }

    return {
        t,
        locale,
    };
}
