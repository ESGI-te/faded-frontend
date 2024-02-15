import styled from 'styled-components';
import EstablishmentServicesForm from '@components/EstablishmentServicesForm';
import Text from 'shared/src/components/Text';
import { FormattedMessage } from 'react-intl';

const EstablishmentServicesPage = () => (
    <Page>
        <PageInner>
            <TitleWrapper>
                <Text variant="headingM" fontWeight="--fw-bold">
                    <FormattedMessage defaultMessage="Gérer mes prestations" />
                </Text>
                <Text variant="bodyL" color="--neutral500">
                    <FormattedMessage defaultMessage="Vos prestations proposées dans votre établissement" />
                </Text>
            </TitleWrapper>
            <EstablishmentServicesForm />
        </PageInner>
    </Page>
);

const Page = styled.section`
    display: flex;
    align-items: start;
    justify-content: center;
    background-color: var(--background);
`;
const PageInner = styled.div`
    display: flex;
    flex-direction: column;
    row-gap: 2rem;
    width: 100%;
    max-width: var(--container-width);
    padding: var(--container-padding-mobile);

    ${({ theme }) => theme.mediaQueries.desktopAndUp} {
        padding: var(--container-padding);
    }
`;
const TitleWrapper = styled.div`
    display: flex;
    flex-direction: column;
    row-gap: 0.25rem;
`;

export default EstablishmentServicesPage;
