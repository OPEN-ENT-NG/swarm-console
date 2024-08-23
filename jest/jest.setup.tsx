import { provider } from '@/i18n/client'

import { ReactNode } from 'react'

jest.mock('react-i18next', () => ({
    // this mock makes sure any components using the translate hook can use it without a warning being shown
    useTranslation: () => {
        return {
            t: (str: string) => str,
            i18n: {
                changeLanguage: () => new Promise(() => { }),
            },
        };
    },
    I18nextProvider: ({ children }: { children: ReactNode }) => {
        return (<> {children}</>)
    },
    initReactI18next: {
        type: '3rdParty',
        init: () => { },
    }
}));
// jest.spyOn(i18nModule, 'getI18nProvider').mockReturnValue(provider)
// eslint-disable-next-line @typescript-eslint/no-unsafe-return
jest.mock('@/i18n', () => ({
    ...(jest.requireActual('@/i18n')),
    getI18nProvider: () => provider
}));

jest.mock('next/navigation', () => ({
    useRouter: () => ({
      push: jest.fn(),
      replace: jest.fn(),
      prefetch: jest.fn(),
    }),
    usePathname: () => '/',
    useSearchParams: () => ({
      get: jest.fn(),
    }),
  }));

// jest.mock("@emotion/styled", function () {
//     return function () {
//         return () => jest.fn()
//     }
// })
