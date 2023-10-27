import { IntlProvider as ReactIntlProvider } from 'react-intl';
import enMessages from '../../lang/en.json';
import frMessages from '../../lang/fr.json';
import useUserQuery from '@queries/user/useUserQuery.hook';
import { useState } from 'react';

export const LOCALES = {
    EN: 'en-US',
    FR: 'fr-FR',
};

const messagesLookup = {
    [LOCALES.EN]: enMessages,
    [LOCALES.FR]: frMessages,
};

const IntlProvider = (props) => {
    // const { data: user } = useUserQuery();
    const [locale, setLocale] = useState(LOCALES.FR);
    // const userLocale = user?.locale || LOCALES.FR;

    return <ReactIntlProvider locale={locale} messages={messagesLookup[locale]} {...props} />;
};

export default IntlProvider;
