import { yupResolver } from '@hookform/resolvers/yup';
import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';
import { useAppointmentFormSchema } from './useAppointmentFormSchema.hook';
import styled from 'styled-components';
import EstablishmentServicesAccordion from '@components/EstablishmentServicesAccordion';
import Text from '@components/Text';
import Cluster from '@components/Cluster';
import { Item, Separator } from 'react-aria-components';
import { icon } from '@fortawesome/fontawesome-svg-core/import.macro';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import IconButton from '@components/IconButton';
import AppointmentCalendar from '@components/AppointmentCalendar';
import { dayjs } from '@utils/dayjs';
import { InputSelectController } from '@components/InputSelect';
import AppointmentAuthentication from '@components/AppointmentAuthentication';
import { useAuth } from '@hooks/useAuth.hook';
import Button from '@components/Button';

const AppointmentForm = ({ service, services, barbers, onSubmit }) => {
    const { isAuthenticated } = useAuth();
    const schema = useAppointmentFormSchema();
    const {
        control,
        handleSubmit,
        formState: { isValid },
        setValue,
        watch,
    } = useForm({
        mode: 'onBlur',
        resolver: yupResolver(schema),
        defaultValues: {
            service,
        },
    });
    const serviceValue = watch('service');
    const barberValue = watch('barberId');
    const dateValue = watch('date');

    const handleChangeService = (service) => {
        setValue('service', service, { shouldValidate: true, shouldDirty: true });
    };
    const handleChangeDate = (date) => {
        setValue('date', date, { shouldValidate: true, shouldDirty: true });
    };
    const handleResetValue = (value) => {
        setValue(value, null, { shouldValidate: true, shouldDirty: true });
    };

    return (
        <Form onSubmit={handleSubmit(onSubmit)}>
            <Step>
                <StepTitle>
                    <span>1.</span>
                    <span>Choix de la prestation</span>
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
                                handleResetValue('barberId');
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
                        <span>Choix de la date & heure</span>
                    </StepTitle>
                    {dateValue ? (
                        <StepResume>
                            <Text>{dayjs(dateValue).format('dddd DD MMMM YYYY HH:mm')}</Text>
                            <EditButton
                                variant="ghost"
                                icon={<EditIcon icon={icon({ name: 'pen', style: 'solid' })} />}
                                onPress={() => handleResetValue('date')}
                            />
                        </StepResume>
                    ) : (
                        <DateStepContent>
                            <BarberSelect
                                control={control}
                                name="barberId"
                                items={barbers}
                                label="Avec qui ?"
                            >
                                {(item) => (
                                    <BarberSelectListItem id={item.name}>
                                        <Cluster gap="0.5rem" align="center">
                                            <BarberImage>
                                                <Text
                                                    color="--white"
                                                    fontWeight="--fw-semibold"
                                                    as="span"
                                                >
                                                    {item.name[0]}
                                                </Text>
                                            </BarberImage>
                                            <Text slot="label">{item.name}</Text>
                                        </Cluster>
                                    </BarberSelectListItem>
                                )}
                            </BarberSelect>
                            <AppointmentCalendar onChange={handleChangeDate} />
                        </DateStepContent>
                    )}
                </Step>
            )}
            {isValid && !isAuthenticated && (
                <Step>
                    <StepTitle>
                        <span>3.</span>
                        <span>Authentification</span>
                    </StepTitle>
                    <AppointmentAuthentication />
                </Step>
            )}
            {isAuthenticated && <SubmitButton type="submit">Réserver</SubmitButton>}
        </Form>
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
const BarberSelectListItem = styled(Item)`
    border-radius: var(--r-xs);
    padding: 0.25rem;

    &[data-selected] {
        background-color: var(--primary400);

        [slot='label'] {
            color: var(--white);
            font-weight: var(--fw-semibold);
        }
    }

    &:hover::not([data-selected]) {
        background-color: var(--primary50);
    }

    &[data-focused] {
        outline: 2px solid var(--primary500);
    }
`;
const SubmitButton = styled(Button)`
    background-color: var(--black);
`;

AppointmentForm.propTypes = {
    service: PropTypes.shape({
        id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        duration: PropTypes.number.isRequired,
        price: PropTypes.string.isRequired,
    }).isRequired,
    services: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.string.isRequired,
            name: PropTypes.string.isRequired,
            duration: PropTypes.number.isRequired,
            price: PropTypes.string.isRequired,
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
};

AppointmentForm.defaultProps = {
    onSubmit: () => {},
};

export default AppointmentForm;
