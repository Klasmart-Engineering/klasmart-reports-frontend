import { DEFAULT_LOCALE } from "../locale/utils";
import { env } from "@/config/index";
import { Cookies } from "react-cookie";
import { atom } from "recoil";
import { recoilPersist } from 'recoil-persist';

const cookies = new Cookies();

const { persistAtom: cookiePersistAtom } = recoilPersist({
    storage: {
        setItem: (key, value) => {
            const entries = JSON.parse(value);
            Object.entries(entries).forEach(([ key, value ]) => {
                cookies.set(key, value, {
                    path: `/`,
                    domain: env.cookieDomain,
                });
            });
        },
        getItem: (key) => cookies.get(key) ?? null,
    },
});

export const localeState = atom<string>({
    key: `locale`,
    default: DEFAULT_LOCALE,
    effects: [ cookiePersistAtom ],
});
