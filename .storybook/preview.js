import StoreProvider from "../src/store/Provider";
import LocaleProvider from "../src/locale/Provider";
import UserServiceProvider from "../src/api/user-service/Provider";
import ThemeProvider from "../src/theme/provider";
import CmsApiClientProvider from "../src/providers/CmsApiClient";
import ReportsApiClientProvider from "../src/providers/ReportsApiClient";
import { GlobalStateProvider } from "@kl-engineering/frontend-state";

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
}

export const globalTypes = {
  locale: {
    name: 'Locale',
    description: 'Internationalization locale',
    defaultValue: 'en-US',
    toolbar: {
      icon: 'globe',
      items: [
        { value: 'en-US', right: '🇺🇸', title: 'English' },
        { value: 'es', right: '🇪🇸', title: 'Español' },
        { value: 'vi', right: '🇻🇳', title: 'Tiếng Việt' },
        { value: 'id', right: '🇮🇩', title: 'bahasa Indonesia' },
        { value: 'th', right: '🇹🇭', title: 'ภาษาไทย' },
        { value: 'zh-CN', right: '🇨🇳', title: '汉语 (简体)' },
        { value: 'ko', right: '🇰🇷', title: '한국어' },
      ],
    },
  },
  theme: {
    name: 'Theme',
    description: 'Global theme for components',
    defaultValue: 'light',
    toolbar: {
      items: [
        {
          value: 'light',
          title: `light`,
          icon: `circlehollow`,
        },
        {
          value: 'dark',
          title: `dark`,
          icon: `circle`,
        },
      ],
    },
  },
}

const withProviders = (Story, context) => {
    const { locale } = context.globals;
    return (
        <GlobalStateProvider cookieDomain={process.env.COOKIE_DOMAIN ?? ``}>
          <StoreProvider>
            <UserServiceProvider>
              <ReportsApiClientProvider>
                <CmsApiClientProvider>
                  <LocaleProvider locale={locale}>
                    <ThemeProvider>
                      <Story {...context} />
                    </ThemeProvider>
                  </LocaleProvider>
                </CmsApiClientProvider>
              </ReportsApiClientProvider>
            </UserServiceProvider>
          </StoreProvider>
        </GlobalStateProvider>
    )
}
export const decorators = [ withProviders ];
