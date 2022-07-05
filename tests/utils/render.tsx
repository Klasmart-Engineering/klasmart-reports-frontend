import { defaultLanguage } from '@/locale/utils';
import { render as RTLRender } from '@testing-library/react';
import React from 'react';
import {
    IntlShape,
    RawIntlProvider,
} from 'react-intl';
import { GlobalStateProvider } from '@kl-engineering/frontend-state';

export interface RenderOptions {
    locale?: IntlShape;
}

export default function render (component: React.ReactNode, options: RenderOptions = {}) {
    const {
        locale = defaultLanguage,
    } = options;
    return RTLRender((
        <GlobalStateProvider cookieDomain={process.env.COOKIE_DOMAIN ?? ``}>
            <RawIntlProvider value={locale}>
                {component}
            </RawIntlProvider>
        </GlobalStateProvider>
    ));
};
