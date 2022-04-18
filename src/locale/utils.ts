import english from "@/locale/locales/en.json";
import spanish from "@/locale/locales/es.json";
import indonesian from "@/locale/locales/id.json";
import korean from "@/locale/locales/ko.json";
import thai from "@/locale/locales/th.json";
import vietnamese from "@/locale/locales/vi.json";
import chinese from "@/locale/locales/zh_CN.json";
import { createIntl, createIntlCache, IntlShape } from "react-intl";

export const DEFAULT_LOCALE = `en-US`;

const supportedLocales = [`en` , `en-US` , `es` , `ko` , `zh` , `zh-CN` , `vi` , `id` , `th`] as const;

type LocaleCode = typeof supportedLocales[number];

interface Language {
    code: LocaleCode;
    text: string;
}

export const LANGUAGES: Language[] = [
    {
        code: `en-US`,
        text: `English`,
    },
    {
        code: `es`,
        text: `Español`,
    },
    {
        code: `ko`,
        text: `한국어`,
    },
    {
        code: `zh-CN`,
        text: `汉语 (简体)`,
    },
    {
        code: `vi`,
        text: `Tiếng Việt`,
    },
    {
        code: `id`,
        text: `bahasa Indonesia`,
    },
    {
        code: `th`,
        text: `ภาษาไทย`,
    },
];

const languageCache = new Map<string, IntlShape>();

export function getDefaultLanguageCode () {
    const browserLocales = navigator.languages;
    return browserLocales.find((browserLocale) => supportedLocales.find((locale) => locale === browserLocale)) ?? defaultLanguage;
}

export function getLanguage (locale: string) {
    const cachedLanguage = languageCache.get(locale);
    if (cachedLanguage) return cachedLanguage;
    const language = getIntl(locale);
    if (language) {
        languageCache.set(locale, language);
        return language;
    }
    return defaultLanguage;
}

const intlCache = createIntlCache();

export const defaultLanguage = createIntl({
    locale: `en-US`,
    messages: english,
}, intlCache);

function getIntl (locale: string) {
    switch (locale) {
    case `es`:
        return createIntl({
            locale: `es`,
            messages: spanish,
        }, intlCache);
    case `ko`:
        return createIntl({
            locale: `ko`,
            messages: korean,
        }, intlCache);
    case `zh`:
    case `zh-CN`:
        return createIntl({
            locale: `zh-CN`,
            messages: chinese,
        }, intlCache);
    case `vi`:
        return createIntl({
            locale: `vi`,
            messages: vietnamese,
        }, intlCache);
    case `id`:
        return createIntl({
            locale: `id`,
            messages: indonesian,
        }, intlCache);
    case `th`:
        return createIntl({
            locale: `th`,
            messages: thai,
        }, intlCache);
    case `en`:
    case `en-US`:
        return defaultLanguage;
    }
}
