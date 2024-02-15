import styled from 'styled-components';
import EstablishmentSchedules from '@components/EstablishmentSchedules';
import Text from 'shared/src/components/Text';
import { FormattedMessage } from 'react-intl';

const EstablishmentSchedulesPage = () => (
    <Page>
        <PageInner>
            <TitleWrapper>
                <Text variant="headingM" fontWeight="--fw-bold">
                    <FormattedMessage defaultMessage="Horaires" />
                </Text>
                <Text variant="bodyL" color="--neutral500">
                    <FormattedMessage defaultMessage="Vos horaires d'ouverture et de fermeture" />
                </Text>
            </TitleWrapper>
            <SchedulesContainer>
                <EstablishmentSchedules />
            </SchedulesContainer>
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
const SchedulesContainer = styled.div`
    background-color: var(--white);
    border-radius: var(--r-l);
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

export default EstablishmentSchedulesPage;
