import { IntlProvider as ReactIntlProvider } from 'react-intl';
import enMessages from '../../lang/en.json';
import frMessages from '../../lang/fr.json';
import useUserQuery from '@queries/user/useUserQuery.hook';

export const LOCALES = {
    EN: 'en',
    FR: 'fr',
};

const messagesLookup = {
    [LOCALES.EN]: enMessages,
    [LOCALES.FR]: frMessages,
};

const IntlProvider = (props) => {
    const { data: user } = useUserQuery();
    const userLocale = user?.locale || LOCALES.FR;

    return (
        <ReactIntlProvider locale={userLocale} messages={messagesLookup[userLocale]} {...props} />
    );
};

export default IntlProvider;
