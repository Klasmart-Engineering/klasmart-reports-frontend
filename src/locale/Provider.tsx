import {
    RawIntlProvider,
} from "react-intl";
import React, { useEffect, useState } from "react";
import { getLanguage } from "@/locale/utils";
import { localeState, useGlobalState } from "@kl-engineering/frontend-state";

export interface LocaleProviderProps {
    locale?: string;
}

const LocaleProvider: React.FC<LocaleProviderProps> = (props) => {
    const [ globalLocale, setGlobalLocale] = useGlobalState(localeState);
    const [ locale, setLocale ] = useState(props.locale ?? globalLocale);

    useEffect(() => {
        setLocale(globalLocale);
    }, [ globalLocale ]);

    useEffect(() => {
        if (!props.locale) return;
        setLocale(props.locale);
    }, [ props.locale ]);


    const language = getLanguage(locale);
    return (
        <RawIntlProvider value={language}>
            {props.children}
        </RawIntlProvider>
    );
}

export default LocaleProvider;
