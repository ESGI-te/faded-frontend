import Text from 'shared/src/components/Text';
import styled from 'styled-components';
import { FormattedMessage } from 'react-intl';
import AvailableServices from './AvailableServices';
import SelectedServices from './SelectedServices';

const EstablishmentServicesForm = () => (
    <Wrapper>
        <SelectedServicesWrapper>
            <Text variant="headingS" fontWeight="--fw-semibold">
                <FormattedMessage defaultMessage="Vos prestations" />
            </Text>
            <SelectedServices />
        </SelectedServicesWrapper>
        <AvailableServicesWrapper>
            <Text variant="headingS" fontWeight="--fw-semibold">
                <FormattedMessage defaultMessage="Prestations disponibles" />
            </Text>
            <AvailableServices />
        </AvailableServicesWrapper>
    </Wrapper>
);

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    row-gap: 1rem;

    background-color: var(--white);
    border-radius: var(--r-l);
    padding: 1rem;

    ${({ theme }) => theme.mediaQueries.desktopAndUp} {
        flex-direction: row;
        column-gap: 1rem;
        height: 500px;
    }
`;
const SelectedServicesWrapper = styled.div`
    display: flex;
    flex-direction: column;
    flex: 1;
    min-height: 0;
    max-height: 500px;

    ${({ theme }) => theme.mediaQueries.desktopAndUp} {
        padding-inline: 2rem;
        padding-block: 2rem 0;
        max-height: none;
    }
`;
const AvailableServicesWrapper = styled.div`
    display: flex;
    flex-direction: column;
    background-color: var(--neutral50);
    border-radius: var(--r-l);
    padding: 0.75rem;
    flex: 1;
    min-height: 0;
    max-height: 500px;

    ${({ theme }) => theme.mediaQueries.desktopAndUp} {
        max-height: none;
        padding: 2rem;
    }
`;

export default EstablishmentServicesForm;
