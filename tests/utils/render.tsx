import { defaultLanguage } from '@/locale/utils';
import { render as RTLRender } from '@testing-library/react';
import React from 'react';
import {
    IntlShape,
    RawIntlProvider,
} from 'react-intl';
import { GlobalStateProvider } from '@kl-engineering/frontend-state';
import ThemeProvider from "../../src/theme/provider";
import ReportsApiClientProvider from '../../src/providers/ReportsApiClient';
import CmsReportsApiClientProvider from '../../src/providers/CmsApiClient';

export interface RenderOptions {
    locale?: IntlShape;
}

export default function render(component: React.ReactNode, options: RenderOptions = {}) {
    const {
        locale = defaultLanguage,
    } = options;
    return RTLRender((
        <GlobalStateProvider cookieDomain={process.env.COOKIE_DOMAIN ?? ``}>
            <ReportsApiClientProvider>
                <CmsReportsApiClientProvider>
                    <RawIntlProvider value={locale}>
                        <ThemeProvider>
                            {component}
                        </ThemeProvider>
                    </RawIntlProvider>
                </CmsReportsApiClientProvider>
            </ReportsApiClientProvider>
        </GlobalStateProvider >
    ));
};
