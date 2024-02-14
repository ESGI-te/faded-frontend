import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import styled from 'styled-components';
import Button from 'shared/src/components/Button';
import PropTypes from 'prop-types';
import { InputTextController } from 'shared/src/components/InputText';
import { FormattedMessage, useIntl } from 'react-intl';
import useBarberFormSchema from './useBarberFormSchema.hook';
import useEditBarberFormSchema from './useEditBarberFormSchema.hook';
import Stack from 'shared/src/components/Stack';
import Cluster from 'shared/src/components/Cluster';
import { SwitchController } from 'shared/src/components/Switch';
import Text from 'shared/src/components/Text';
import { InputTimeController } from 'shared/src/components/InputTime';

const DEFAULT_SCHEDULES = {
    monday: {
        open: '09:00:00',
        close: '18:00:00',
        isOpen: true,
    },
    tuesday: {
        open: '09:00:00',
        close: '18:00:00',
        isOpen: true,
    },
    wednesday: {
        open: '09:00:00',
        close: '18:00:00',
        isOpen: true,
    },
    thursday: {
        open: '09:00:00',
        close: '18:00:00',
        isOpen: true,
    },
    friday: {
        open: '09:00:00',
        close: '18:00:00',
        isOpen: true,
    },
    saturday: {
        open: '09:00:00',
        close: '18:00:00',
        isOpen: false,
    },
    sunday: {
        open: '09:00:00',
        close: '18:00:00',
        isOpen: false,
    },
};

const BarberForm = ({ onSubmit, isLoading, isEdit, defaultValues }) => {
    const intl = useIntl();
    const createSchema = useBarberFormSchema();
    const editSchema = useEditBarberFormSchema();
    const schema = isEdit ? editSchema : createSchema;
    const { control, handleSubmit, formState, getValues, watch } = useForm({
        mode: 'onBlur',
        resolver: yupResolver(schema),
        defaultValues: isEdit ? defaultValues : { planning: DEFAULT_SCHEDULES },
    });
    const { isDirty } = formState;

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

    watch(); // hack to get form to update

    return (
        <Form onSubmit={handleSubmit(onSubmit)}>
            <ResponsiveWrapper>
                <InputTextController
                    control={control}
                    name="firstName"
                    placeholder={intl.formatMessage({ defaultMessage: 'Prénom' })}
                    label={<FormattedMessage defaultMessage="Prénom" />}
                />
                <InputTextController
                    control={control}
                    name="lastName"
                    placeholder={intl.formatMessage({ defaultMessage: 'Nom' })}
                    label={<FormattedMessage defaultMessage="Nom" />}
                />
            </ResponsiveWrapper>
            <InputTextController
                control={control}
                name="email"
                placeholder="Email"
                label="Email"
                type="email"
            />
            <Stack gap="1.5rem">
                {Object.entries(planningLookup).map(([day, label]) => (
                    <DayWrapper key={day}>
                        <Cluster gap="0.5rem" align="center">
                            <Day>{label}</Day>
                            <Cluster gap="0.5rem" align="center">
                                <SwitchController
                                    control={control}
                                    defaultSelected={getDayPlanning(day)?.isOpen}
                                    name={`planning.${day}.isOpen`}
                                />
                                <Text>
                                    {getDayPlanning(day).isOpen ? (
                                        <FormattedMessage defaultMessage="Travaillé" />
                                    ) : (
                                        <FormattedMessage defaultMessage="Congé" />
                                    )}
                                </Text>
                            </Cluster>
                        </Cluster>
                        {getDayPlanning(day)?.isOpen && (
                            <InputGroup>
                                <InputTimeController
                                    shouldForceLeadingZeros
                                    control={control}
                                    name={`planning.${day}.open`}
                                />
                                <Divider>
                                    <FormattedMessage defaultMessage="à" />
                                </Divider>
                                <InputTimeController
                                    shouldForceLeadingZeros
                                    control={control}
                                    name={`planning.${day}.close`}
                                />
                            </InputGroup>
                        )}
                    </DayWrapper>
                ))}
            </Stack>
            <SubmitButton isDisabled={!isDirty} isLoading={isLoading} type="submit">
                {isEdit ? (
                    <FormattedMessage defaultMessage="Modifier" />
                ) : (
                    <FormattedMessage defaultMessage="Ajouter" />
                )}
            </SubmitButton>
        </Form>
    );
};

const Form = styled.form`
    display: flex;
    flex-direction: column;
    row-gap: 1rem;
    width: 100%;

    ${({ theme }) => theme.mediaQueries.desktopAndUp} {
        row-gap: 2rem;
    }
`;
const SubmitButton = styled(Button)`
    margin-top: 1rem;
    align-self: stretch;
    background-color: var(--black);
`;
const ResponsiveWrapper = styled.div`
    display: flex;
    flex-direction: column;
    row-gap: 1rem;

    ${({ theme }) => theme.mediaQueries.desktopAndUp} {
        flex-direction: row;
        column-gap: 1rem;
    }
`;
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

BarberForm.propTypes = {
    onSubmit: PropTypes.func.isRequired,
    isLoading: PropTypes.bool,
    isEdit: PropTypes.bool,
    defaultValues: PropTypes.object,
};

BarberForm.defaultProps = {
    onSubmit: () => {},
    isLoading: false,
    isEdit: false,
};

export default BarberForm;
