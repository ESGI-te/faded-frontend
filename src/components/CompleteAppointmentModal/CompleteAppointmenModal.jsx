import PropTypes from 'prop-types';
import Modal from '@components/Modal';
import Text from '@components/Text';
import styled from 'styled-components';
import ModalCloseButton from '@components/ModalCloseButton';
import Stack from '@components/Stack';
import { FormattedMessage } from 'react-intl';
import CompleteAppointment from '@components/CompleteAppointment';

const CompleteBarberModal = ({ appointment, isOpen, onOpenChange }) => {
    const handleClose = () => onOpenChange(false);

    return (
        <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
            <Stack gap="1.5rem">
                <ModalHeader>
                    <Stack gap="0.25rem">
                        <Text variant="headingM" fontWeight="--fw-bold">
                            <FormattedMessage defaultMessage="Valider le rendez-vous" />
                        </Text>
                        <Text color="--neutral500">
                            <FormattedMessage defaultMessage="Veuillez rentrer le code de validation du client pour valider le rendez-vous." />
                        </Text>
                    </Stack>
                    <ModalCloseButton onPress={handleClose} />
                </ModalHeader>
                <CompleteAppointment appointment={appointment} onCloseModal={handleClose} />
            </Stack>
        </Modal>
    );
};

const ModalHeader = styled.div`
    display: flex;
    align-items: start;
    justify-content: space-between;
    column-gap: 1.5rem;
`;

CompleteBarberModal.propTypes = {
    appointment: PropTypes.object.isRequired,
    isOpen: PropTypes.bool.isRequired,
    onOpenChange: PropTypes.func.isRequired,
};

export default CompleteBarberModal;
