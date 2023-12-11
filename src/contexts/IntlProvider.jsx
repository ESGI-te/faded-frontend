import { IntlProvider as ReactIntlProvider } from 'react-intl';
import enMessages from '../../lang/en.json';
import frMessages from '../../lang/fr.json';
import useUserQuery from '@queries/user/useUserQuery.hook';
import { createContext, useContext, useState } from 'react';
import { I18nProvider } from 'react-aria';

export const LOCALES = {
    EN: 'en',
    FR: 'fr',
};

const messagesLookup = {
    [LOCALES.EN]: enMessages,
    [LOCALES.FR]: frMessages,
};

const ChangeLocaleContext = createContext({});

const IntlProvider = ({ children }) => {
    // const { data: user } = useUserQuery();
    const defaultLocale = localStorage.getItem('locale') || LOCALES.FR;
    const [locale, setLocale] = useState(defaultLocale);
    const userLocale = locale;

    return (
        <ReactIntlProvider locale={userLocale} messages={messagesLookup[userLocale]}>
            <I18nProvider locale={userLocale}>
                <ChangeLocaleContext.Provider value={setLocale}>
                    {children}
                </ChangeLocaleContext.Provider>
            </I18nProvider>
        </ReactIntlProvider>
    );
};

export const useChangeLocale = () => {
    const setLocale = useContext(ChangeLocaleContext);
    const changeLocale = (locale) => {
        localStorage.setItem('locale', locale);
        setLocale(locale);
    };

    return changeLocale;
};

export default IntlProvider;
