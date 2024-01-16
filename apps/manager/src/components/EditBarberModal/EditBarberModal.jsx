import PropTypes from 'prop-types';
import Modal from 'shared/src/components/Modal';
import Text from 'shared/src/components/Text';
import styled from 'styled-components';
import ModalCloseButton from 'shared/src/components/ModalCloseButton';
import EditBarber from '@components/EditBarber';
import Stack from 'shared/src/components/Stack';
import { FormattedMessage } from 'react-intl';

const EditBarberModal = ({ barber }) => {
    return (
        <Modal>
            {({ close }) => (
                <Stack gap="1.5rem">
                    <ModalHeader>
                        <Stack gap="0.25rem">
                            <Text variant="headingM" fontWeight="--fw-bold">
                                <FormattedMessage defaultMessage="Modifier un membre" />
                            </Text>
                            <Text color="--neutral500">
                                <FormattedMessage defaultMessage="Celui-ci recevra un mail à l'adresse indiquée et pourra s'identifier" />
                            </Text>
                        </Stack>
                        <ModalCloseButton onPress={close} />
                    </ModalHeader>
                    <EditBarber barber={barber} onCloseModal={close} />
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

EditBarberModal.propTypes = {
    barber: PropTypes.object.isRequired,
};

EditBarberModal.defaultProps = {
    onOpenChange: () => {},
};

export default EditBarberModal;
