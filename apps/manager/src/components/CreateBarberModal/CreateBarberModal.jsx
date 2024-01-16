import PropTypes from 'prop-types';
import Modal from 'shared/src/components/Modal';
import Text from 'shared/src/components/Text';
import styled from 'styled-components';
import ModalCloseButton from 'shared/src/components/ModalCloseButton';
import CreateBarber from '@components/CreateBarber';
import Stack from 'shared/src/components/Stack';

const CreateBarberModal = () => {
    return (
        <Modal>
            {({ close }) => (
                <Stack gap="1.5rem">
                    <ModalHeader>
                        <Stack gap="0.25rem">
                            <Text variant="headingM" fontWeight="--fw-bold">
                                Ajouter un membre
                            </Text>
                            <Text color="--neutral500">
                                Celui-ci recevra un mail à l'adresse indiquée et pourra s'identifier
                            </Text>
                        </Stack>
                        <ModalCloseButton onPress={close} />
                    </ModalHeader>
                    <CreateBarber onCloseModal={close} />
                </Stack>
            )}
        </Modal>
    );
};

const ModalHeader = styled.div`
    display: flex;
    align-items: start;
    justify-content: space-between;
    column-gap: 1.5rem;
`;

CreateBarberModal.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onOpenChange: PropTypes.func.isRequired,
};

CreateBarberModal.defaultProps = {
    isOpen: false,
    onOpenChange: () => {},
};

export default CreateBarberModal;
