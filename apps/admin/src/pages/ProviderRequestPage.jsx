import ProviderRequests from '@components/ProviderRequests';
import React from 'react';
import styled from 'styled-components';
import Text from 'shared/src/components/Text';

const ProviderRequestPage = () => {
    return (
        <Page>
             <PageInnerWrapper>
                <TitleWrapper>
                    <Text variant="headingM" fontWeight="--fw-bold">
                        Demandes d'ajout de prestataire
                    </Text>
                    <Text variant="bodyL" color="--neutral500">
                        Gérez les demandes d'ajout de prestataire
                    </Text>
                </TitleWrapper>
                <ProviderRequests />
            </PageInnerWrapper>
        </Page>
    );
};

const Page = styled.section`
    display: flex;
    align-items: start;
    justify-content: center;
    background-color: var(--background);
`;
const PageInnerWrapper = styled.div`
    display: flex;
    flex-direction: column;
    row-gap: 2rem;
    width: 100%;
    background-color: var(--background);
    padding: var(--container-padding-mobile);
    max-width: var(--container-width);

    ${({ theme }) => theme.mediaQueries.desktopAndUp} {
        padding: var(--container-padding);
    }
`;
const TitleWrapper = styled.div`
    display: flex;
    flex-direction: column;
    row-gap: 0.25rem;
`;

export default ProviderRequestPage;
