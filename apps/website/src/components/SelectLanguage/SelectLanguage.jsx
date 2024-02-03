import { LOCALES, useChangeLocale } from '@contexts/IntlProvider';
import { useIntl } from 'react-intl';
import InputSelect from 'shared/src/components/InputSelect';
import styled from 'styled-components';

const SelectLanguage = () => {
    const { locale } = useIntl();
    const localeItems = Object.values(LOCALES).map((locale) => ({
        name: locale.toUpperCase(),
        id: locale,
    }));
    const changeLocale = useChangeLocale();

    return (
        <Select
            onSelectionChange={(locale) => changeLocale(locale)}
            defaultSelectedKey={locale}
            items={localeItems}
            noBorder
        />
    );
};

const Select = styled(InputSelect)`
    max-width: fit-content;
`;

export default SelectLanguage;
