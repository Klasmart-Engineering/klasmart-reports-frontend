import english from "./en.json";
import spanish from "./es.json";
import indonesian from "./id.json";
import korean from "./ko.json";
import thai from "./th.json";
import vietnamese from "./vi.json";
import chinese from "./zh_CN.json";
import { Language } from "@kl-engineering/kidsloop-px/dist/src/components/LanguageSelect";
import {
    createIntl,
    createIntlCache,
} from "react-intl";

export const localeCodes = [
    `en-US`,
    `ko`,
    `zh-CN`,
    `vi`,
    `id`,
    `es`,
    `th`,
];
export const LANGUAGES_LABEL: Language[] = [
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

const intlCache = createIntlCache();
export const fallbackLocale = createIntl({
    locale: `en`,
    messages: english,
}, intlCache);
export function getIntl (locale: string) {
    switch (locale) {
    case `en`:
        return createIntl({
            locale: `en-US`,
            messages: english,
        }, intlCache);
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
    }
}
