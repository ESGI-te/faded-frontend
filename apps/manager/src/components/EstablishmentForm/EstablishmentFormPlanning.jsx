import Stack from 'shared/src/components/Stack';
import styled from 'styled-components';
import { FormattedMessage, useIntl } from 'react-intl';
import { useFormContext } from 'react-hook-form';
import { InputTimeController } from 'shared/src/components/InputTime';
import EstablishmentFormAccordionNextStepButton from './EstablishmentFormAccordion/EstablishmentFormAccordionNextStepButton';
import Text from 'shared/src/components/Text';
import Cluster from 'shared/src/components/Cluster';
import { SwitchController } from 'shared/src/components/Switch';

const EstablishmentFormPlanning = () => {
    const { control, getValues } = useFormContext();
    const intl = useIntl();

    const planningLookup = {
        monday: intl.formatMessage({ defaultMessage: 'Lundi' }),
        tuesday: intl.formatMessage({ defaultMessage: 'Mardi' }),
        wednesday: intl.formatMessage({ defaultMessage: 'Mercredi' }),
        thursday: intl.formatMessage({ defaultMessage: 'Jeudi' }),
        friday: intl.formatMessage({ defaultMessage: 'Vendredi' }),
        saturday: intl.formatMessage({ defaultMessage: 'Samedi' }),
        sunday: intl.formatMessage({ defaultMessage: 'Dimanche' }),
    };

    const getDayPlanning = (day) => getValues(`planning.${day}`);

    return (
        <Stack gap="1.5rem">
            {Object.entries(planningLookup).map(([day, label]) => (
                <DayWrapper key={day}>
                    <Cluster gap="0.5rem" align="center">
                        <Day>{label}</Day>
                        <Cluster gap="0.5rem" align="center">
                            <SwitchController
                                defaultSelected={getDayPlanning(day)?.isOpen}
                                name={`planning.${day}.isOpen`}
                            />
                            <Text>{getDayPlanning(day).isOpen ? 'open' : 'closed'}</Text>
                        </Cluster>
                    </Cluster>
                    {getDayPlanning(day)?.isOpen && (
                        <InputGroup>
                            <InputTimeController control={control} name={`planning.${day}.open`} />
                            <Divider>
                                <FormattedMessage defaultMessage="à" />
                            </Divider>
                            <InputTimeController control={control} name={`planning.${day}.close`} />
                        </InputGroup>
                    )}
                </DayWrapper>
            ))}
            <EstablishmentFormAccordionNextStepButton />
        </Stack>
    );
};

const DayWrapper = styled.div`
    display: flex;
    flex-direction: column;
    row-gap: 0.5rem;
    width: 100%;

    ${({ theme }) => theme.mediaQueries.desktopAndUp} {
        flex-direction: row;
        align-items: center;
        column-gap: 1rem;
        height: 2.5rem;

        & > :first-child,
        & > :last-child {
            flex: 1;
        }
    }
`;
const Day = styled.p`
    font-size: var(--fs-body-l);
    font-weight: var(--fw-semibold);
    color: var(--black);

    ${({ theme }) => theme.mediaQueries.desktopAndUp} {
        flex-basis: 5rem;
    }
`;
const InputGroup = styled.div`
    display: flex;
    align-items: center;
    column-gap: 0.5rem;
`;
const Divider = styled.span`
    text-transform: uppercase;
`;

export default EstablishmentFormPlanning;
