import Text from 'shared/src/components/Text';
import styled from 'styled-components';
import Services from '@components/Services';
import { FormattedMessage } from 'react-intl';

const ServicesPage = () => (
    <Page>
        <PageInner>
            <TitleWrapper>
                <Text variant="headingM" fontWeight="--fw-bold">
                    <FormattedMessage defaultMessage="Gérer mes prestations" />
                </Text>
                <Text variant="bodyL" color="--neutral500">
                    <FormattedMessage defaultMessage="Ajoutez, modifiez ou supprimez des services de votre organisation" />
                </Text>
            </TitleWrapper>
            <Services />
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

export default ServicesPage;
