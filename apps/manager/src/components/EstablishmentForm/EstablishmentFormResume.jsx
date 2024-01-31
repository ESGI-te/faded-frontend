import EstablishmentStatusBadge from '@components/EstablishmentStatusBadge';
import styled from 'styled-components';
import { useEstablishmentBeingEdited } from './EstablishmentFormProvider';
import Text from 'shared/src/components/Text';
import { FormattedMessage } from 'react-intl';
import Stack from 'shared/src/components/Stack';
import Cluster from 'shared/src/components/Cluster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { icon } from '@fortawesome/fontawesome-svg-core/import.macro';
import { useFormContext } from 'react-hook-form';

const EstablishmentFormResume = () => {
    const establishment = useEstablishmentBeingEdited();
    const { watch } = useFormContext();
    const address = watch('information.address');
    const name = watch('information.name');
    const nbBarbers = watch('barbers').length;
    const nbServices = watch('services').length;

    return (
        <Container>
            <EstablishmentStatusBadge status={establishment.status} />
            <Stack>
                <Text nbOfLines={1} variant="bodyL" fontWeight="--fw-bold">
                    {name}
                </Text>
                <Text nbOfLines={1} variant="bodyM" color="--neutral500">
                    {address || <FormattedMessage defaultMessage="Aucune adresse" />}
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
                        values={{ nbBarbers }}
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
                        values={{ nbServices }}
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

EstablishmentFormResume.propTypes = {};

export default EstablishmentFormResume;
