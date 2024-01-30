import EstablishmentStatusBadge from '@components/EstablishmentStatusBadge';
import styled from 'styled-components';
import { useEstablishmentBeingEdited } from './EstablishmentFormProvider';
import Text from 'shared/src/components/Text';
import { FormattedMessage } from 'react-intl';
import Stack from 'shared/src/components/Stack';
import Cluster from 'shared/src/components/Cluster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { icon } from '@fortawesome/fontawesome-svg-core/import.macro';

const EstablishmentFormResume = (props) => {
    const establishment = useEstablishmentBeingEdited();

    return (
        <Container>
            <EstablishmentStatusBadge status={establishment.status} />
            <Stack>
                <Text nbOfLines={1} variant="bodyL" fontWeight="--fw-bold">
                    {establishment.name}
                </Text>
                <Text nbOfLines={1} variant="bodyM" color="--neutral500">
                    {establishment.address || <FormattedMessage defaultMessage="Aucune adresse" />}
                </Text>
            </Stack>
            <Cluster gap="0.5rem" align="center">
                <FontAwesomeIcon
                    icon={icon({ name: 'people-group', style: 'solid' })}
                    color="var(--neutral500)"
                />
                <Text color="--neutral500">
                    <FormattedMessage
                        defaultMessage="{nbBarbers, plural, 
                            =1 {# coiffeur}
                            other {# coiffeurs}
                        }"
                        values={{ nbBarbers: establishment.barbers.length }}
                    />
                </Text>
            </Cluster>
            <Cluster gap="0.5rem" align="center">
                <FontAwesomeIcon
                    icon={icon({ name: 'wand-magic-sparkles', style: 'solid' })}
                    color="var(--neutral500)"
                />
                <Text color="--neutral500">
                    <FormattedMessage
                        defaultMessage="{nbServices, plural, 
                            =1 {# prestation}
                            other {# prestations}
                        }"
                        values={{ nbServices: establishment.services.length }}
                    />
                </Text>
            </Cluster>
        </Container>
    );
};

const Container = styled.div`
    width: 100%;
    background-color: var(--white);
    border-radius: var(--r-l);
    padding: 1rem;
    display: flex;
    flex-direction: column;
    row-gap: 1rem;
`;
const IndicatorWrapper = styled.div`
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 1rem;
    border-radius: var(--r-m);
    background-color: var(--primary100);
`;
const Indicator = styled(Text)`
    font-weight: var(--fw-semibold);
    font-size: var(--fs-body-m);
    display: flex;
    align-items: center;
    flex-direction: column;
    row-gap: 0.25rem;
`;

EstablishmentFormResume.propTypes = {};

export default EstablishmentFormResume;
