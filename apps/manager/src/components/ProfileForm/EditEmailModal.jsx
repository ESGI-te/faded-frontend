import PropTypes from 'prop-types';
import Modal from 'shared/src/components/Modal';
import Text from 'shared/src/components/Text';
import styled from 'styled-components';
import ModalCloseButton from 'shared/src/components/ModalCloseButton';
import Stack from 'shared/src/components/Stack';
import { FormattedMessage } from 'react-intl';
import EmailForm from '@components/EmailForm';

const EditEmailModal = ({ user, isOpen, onOpenChange }) => {
    return (
        <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
            <Stack gap="1.5rem">
                <ModalHeader>
                    <Stack gap="0.25rem">
                        <Text variant="headingM" fontWeight="--fw-bold">
                            <FormattedMessage defaultMessage="Modifier votre e-mail" />
                        </Text>
                    </Stack>
                    <ModalCloseButton onPress={() => onOpenChange(false)} />
                </ModalHeader>
                <EmailForm user={user} onCloseModal={() => onOpenChange(false)} />
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

EditEmailModal.propTypes = {
    user: PropTypes.object.isRequired,
    isOpen: PropTypes.bool,
    onOpenChange: PropTypes.func,
};

EditEmailModal.defaultProps = {
    isOpen: false,
    onOpenChange: () => {},
};

export default EditEmailModal;
