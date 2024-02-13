import { yupResolver } from '@hookform/resolvers/yup';
import PropTypes from 'prop-types';
import { FormProvider, useForm } from 'react-hook-form';
import { useAppointmentFormSchema } from './useAppointmentFormSchema.hook';
import styled from 'styled-components';
import EstablishmentServicesAccordion from '@components/EstablishmentServicesAccordion';
import Text from 'shared/src/components/Text';
import Cluster from 'shared/src/components/Cluster';
import { ListBoxItem, Separator } from 'react-aria-components';
import { icon } from '@fortawesome/fontawesome-svg-core/import.macro';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import IconButton from 'shared/src/components/IconButton';
import AppointmentCalendar from '@components/AppointmentCalendar';
import { dayjs } from '@utils/dayjs';
import { InputSelectController } from 'shared/src/components/InputSelect';
import AppointmentAuthentication from '@components/AppointmentAuthentication';
import Button from 'shared/src/components/Button';
import { useAuth } from '@contexts/AuthProvider';
import { useMemo } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';

const AppointmentForm = ({ service, services, barbers, onSubmit, isLoading }) => {
    const intl = useIntl();
    const formattedBarbers = useMemo(() => {
        const data = barbers?.map((barber) => ({ id: barber.id, name: barber.firstName })) || [];
        return [
            { id: '', name: intl.formatMessage({ defaultMessage: 'Sans préférence' }) },
            ...data,
        ];
    }, [barbers]);

    const { isAuthenticated } = useAuth();
    const schema = useAppointmentFormSchema();
    const form = useForm({
        mode: 'onBlur',
        resolver: yupResolver(schema),
        defaultValues: {
            service,
            barber: '',
        },
    });
    const {
        control,
        handleSubmit,
        formState: { isValid },
        setValue,
        watch,
    } = form;

    const serviceValue = watch('service');
    const dateTimeValue = watch('dateTime');

    const handleChangeService = (service) => {
        setValue('service', service, { shouldValidate: true, shouldDirty: true });
    };
    const handleChangeDate = (dateTime) => {
        setValue('dateTime', dateTime, { shouldValidate: true, shouldDirty: true });
    };
    const handleResetValue = (value) => {
        setValue(value, null, { shouldValidate: true, shouldDirty: true });
    };
    console.log(isAuthenticated);
    return (
        <FormProvider {...form}>
            <Form onSubmit={handleSubmit(onSubmit)}>
                <Step>
                    <StepTitle>
                        <span>1.</span>
                        <span>
                            <FormattedMessage defaultMessage="Choix de la prestation" />
                        </span>
                    </StepTitle>
                    {serviceValue ? (
                        <StepResume>
                            <ServiceInnerWrapper>
                                <Text>{serviceValue.name}</Text>
                                <Cluster gap="0.5rem" align="center">
                                    <Text color="--neutral500">{serviceValue.duration} min</Text>
                                    <Divider />
                                    <Text color="--neutral500">{serviceValue.price} €</Text>
                                </Cluster>
                            </ServiceInnerWrapper>
                            <EditButton
                                variant="ghost"
                                icon={<TrashIcon icon={icon({ name: 'trash', style: 'solid' })} />}
                                onPress={() => {
                                    handleResetValue('service');
                                    handleResetValue('date');
                                    handleResetValue('barber');
                                }}
                            />
                        </StepResume>
                    ) : (
                        <EstablishmentServicesAccordion
                            services={services}
                            onChange={handleChangeService}
                            defaultIndex={0}
                        />
                    )}
                </Step>
                {serviceValue && (
                    <Step>
                        <StepTitle>
                            <span>2.</span>
                            <span>
                                <FormattedMessage defaultMessage="Choix de la date & heure" />
                            </span>
                        </StepTitle>
                        {dateTimeValue ? (
                            <StepResume>
                                <Text>
                                    {dayjs(dateTimeValue).format('dddd DD MMMM YYYY HH:mm')}
                                </Text>
                                <EditButton
                                    variant="ghost"
                                    icon={<EditIcon icon={icon({ name: 'pen', style: 'solid' })} />}
                                    onPress={() => handleResetValue('dateTime')}
                                />
                            </StepResume>
                        ) : (
                            <DateStepContent>
                                {formattedBarbers?.length > 1 && (
                                    <BarberSelect
                                        control={control}
                                        name="barber"
                                        items={formattedBarbers}
                                        label={<FormattedMessage defaultMessage="Avec qui ?" />}
                                        defaultSelectedKey=""
                                    >
                                        {(item) => (
                                            <BarberSelectListItem id={item.id}>
                                                <Cluster gap="0.5rem" align="center">
                                                    {item.id && (
                                                        <BarberImage>
                                                            <Text
                                                                color="--white"
                                                                fontWeight="--fw-semibold"
                                                                as="span"
                                                            >
                                                                {item.name[0]}
                                                            </Text>
                                                        </BarberImage>
                                                    )}
                                                    <Text slot="label">{item.name}</Text>
                                                </Cluster>
                                            </BarberSelectListItem>
                                        )}
                                    </BarberSelect>
                                )}
                                <AppointmentCalendar onChange={handleChangeDate} />
                            </DateStepContent>
                        )}
                    </Step>
                )}

                {isAuthenticated && (
                    <SubmitButton type="submit" isLoading={isLoading}>
                        <FormattedMessage defaultMessage="Réserver" />
                    </SubmitButton>
                )}
            </Form>
            {isValid && !isAuthenticated && (
                <Step>
                    <StepTitle>
                        <span>3.</span>
                        <span>Authentification</span>
                    </StepTitle>
                    <AppointmentAuthentication />
                </Step>
            )}
        </FormProvider>
    );
};

const Form = styled.form`
    display: flex;
    flex-direction: column;
    row-gap: 2rem;
`;
const Step = styled.div`
    display: flex;
    flex-direction: column;
    row-gap: 1rem;
`;
const StepTitle = styled.div`
    display: flex;
    align-items: center;
    column-gap: 0.25rem;
    font-size: var(--fs-heading-s);
    font-weight: var(--fw-semibold);

    & > :first-child {
        color: var(--primary500);
    }
`;
const StepContent = styled.div`
    background-color: var(--white);
    padding: 1rem;
    border-radius: var(--r-s);
`;
const DateStepContent = styled(StepContent)`
    display: flex;
    flex-direction: column;
    row-gap: 1rem;
    width: 100%;
`;
const StepResume = styled(StepContent)`
    display: flex;
    align-items: center;
    justify-content: space-between;
`;
const Divider = styled(Separator)`
    width: 0.25rem;
    height: 0.25rem;
    background-color: var(--neutral300);
    border-radius: var(--r-full);
`;
const ServiceInnerWrapper = styled.div`
    display: flex;
    flex-direction: column;
    row-gap: 0.25rem;
`;
const EditIcon = styled(FontAwesomeIcon)`
    width: 1rem;
    height: 1rem;
    color: var(--black);
`;
const TrashIcon = styled(FontAwesomeIcon)`
    width: 1rem;
    height: 1rem;
    color: var(--alert500);
`;
const EditButton = styled(IconButton)`
    border-radius: var(--r-full);

    &[data-hovered] {
        background-color: var(--neutral100);
    }
`;
const BarberSelect = styled(InputSelectController)`
    ${({ theme }) => theme.mediaQueries.tabletAndUp} {
        max-width: 300px;
    }
`;
const BarberImage = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 2rem;
    height: 2rem;
    border-radius: var(--r-full);
    background-color: var(--black);
`;
const BarberSelectListItem = styled(ListBoxItem)`
    border-radius: var(--r-xs);
    padding: 0.25rem;
    cursor: pointer;

    &[data-selected] {
        background-color: var(--primary400);

        [slot='label'] {
            color: var(--white);
            font-weight: var(--fw-semibold);
        }
    }

    &:hover:not([data-selected]) {
        background-color: var(--primary50);
    }

    &[data-focused] {
        outline: none;
    }

    &[data-focus-visible] {
        outline: 2px solid var(--primary500);
    }
`;
const SubmitButton = styled(Button)`
    background-color: var(--black);
    margin-top: 1rem;

    ${({ theme }) => theme.mediaQueries.tabletAndUp} {
        margin-top: 2rem;
    }
`;

AppointmentForm.propTypes = {
    service: PropTypes.shape({
        id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        duration: PropTypes.number.isRequired,
        price: PropTypes.number.isRequired,
    }).isRequired,
    services: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.string.isRequired,
            name: PropTypes.string.isRequired,
            duration: PropTypes.number.isRequired,
            price: PropTypes.number.isRequired,
        }),
    ).isRequired,
    barbers: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.number.isRequired,
            firstName: PropTypes.string.isRequired,
            lastName: PropTypes.string.isRequired,
        }),
    ).isRequired,
    onSubmit: PropTypes.func.isRequired,
    isLoading: PropTypes.bool,
};

AppointmentForm.defaultProps = {
    onSubmit: () => {},
    isLoading: false,
};

export default AppointmentForm;
