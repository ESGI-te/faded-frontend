import PropTypes from 'prop-types';
import Modal from 'shared/src/components/Modal';
import Text from 'shared/src/components/Text';
import styled from 'styled-components';
import Stack from 'shared/src/components/Stack';
import { icon } from '@fortawesome/fontawesome-svg-core/import.macro';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Button from 'shared/src/components/Button';
import dayjs from 'dayjs';
import Cluster from 'shared/src/components/Cluster';

const CancelAppointmentModal = ({ onCancel, isLoading, appointment, isOpen, onOpenChange }) => (
    <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        isDismissable={false}
        isKeyboardDismissDisabled={true}
    >
        <Stack gap="2rem">
            <ModalHeader>
                <IconWrapper>
                    <TrashIcon icon={icon({ name: 'trash', style: 'solid' })} />
                </IconWrapper>
                <Text variant="headingM" fontWeight="--fw-bold">
                    Souhaitez-vous annuler ce RDV ?
                </Text>
            </ModalHeader>
            <AppointmentWrapper>
                <Stack gap="0.25rem">
                    <Text fontWeight="--fw-semibold">{appointment.establishment.name}</Text>
                    <Text>{dayjs(appointment.dateTime).format('DD/MM/YYYY HH:mm')}</Text>
                </Stack>
                <Cluster gap="1rem">
                    <Cluster align="center" gap="0.5rem">
                        <AppointmentIcon
                            icon={icon({ name: 'wand-magic-sparkles', style: 'solid' })}
                        />
                        <Text color="--neutral500">{appointment.service.name}</Text>
                    </Cluster>
                    <Cluster align="center" gap="0.5rem">
                        <AppointmentIcon icon={icon({ name: 'scissors', style: 'solid' })} />
                        <Text color="--neutral500">
                            {appointment.user.firstName} {appointment.user.lastName}
                        </Text>
                    </Cluster>
                    <Cluster align="center" gap="0.5rem">
                        <AppointmentIcon icon={icon({ name: 'user', style: 'solid' })} />
                        <Text color="--neutral500">
                            {appointment.barber.firstName} {appointment.barber.lastName}
                        </Text>
                    </Cluster>
                </Cluster>
            </AppointmentWrapper>
            <Stack gap="0.5rem">
                <DeleteButton onPress={onCancel} isLoading={isLoading}>
                    Oui, annuler
                </DeleteButton>
                <Button variant="ghost" color="--neutral500" onPress={() => onOpenChange(false)}>
                    Non
                </Button>
            </Stack>
        </Stack>
    </Modal>
);

const ModalHeader = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    row-gap: 0.5rem;
`;
const TrashIcon = styled(FontAwesomeIcon)`
    font-size: 1rem;
    color: var(--alert500);
`;
const IconWrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 3rem;
    height: 3rem;
    border-radius: var(--r-m);
    background-color: var(--alert50);
`;
const DeleteButton = styled(Button)`
    width: 100%;
    background-color: var(--alert50);
    color: var(--alert);
`;
const AppointmentWrapper = styled.div`
    display: flex;
    flex-direction: column;
    row-gap: 0.5rem;
    border-radius: var(--r-s);
    border: solid 1px var(--neutral300);
    padding: 0.75rem;
`;
const AppointmentIcon = styled(FontAwesomeIcon)`
    font-size: 0.75rem;
    color: var(--neutral500);
`;

CancelAppointmentModal.propTypes = {
    onCancel: PropTypes.func,
    isLoading: PropTypes.bool,
    appointment: PropTypes.object,
    onClose: PropTypes.func,
    isOpen: PropTypes.bool,
    onOpenChange: PropTypes.func,
};

CancelAppointmentModal.defaultProps = {
    isLoading: false,
    onCancel: () => {},
};

export default CancelAppointmentModal;
