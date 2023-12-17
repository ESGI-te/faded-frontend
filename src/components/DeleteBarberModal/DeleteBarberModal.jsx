import PropTypes from 'prop-types';
import Modal from '@components/Modal';
import Text from '@components/Text';
import styled from 'styled-components';
import Stack from '@components/Stack';
import { icon } from '@fortawesome/fontawesome-svg-core/import.macro';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Button from '@components/Button';

const DeleteBarberModal = ({ onDelete, isLoading }) => {
    return (
        <Modal isDismissable={false} isKeyboardDismissDisabled={true}>
            {({ close }) => (
                <Stack gap="2rem">
                    <ModalHeader>
                        <IconWrapper>
                            <TrashIcon icon={icon({ name: 'trash', style: 'solid' })} />
                        </IconWrapper>
                        <Text variant="headingM" fontWeight="--fw-bold">
                            Souhaitez-vous supprimer ce membre ?
                        </Text>
                    </ModalHeader>
                    <Text color="--neutral500" textAlign="center">
                        Celui-ci sera définivement supprimé de votre équipe.
                    </Text>
                    <Stack gap="0.5rem">
                        <DeleteButton onPress={() => onDelete(close)} isLoading={isLoading}>
                            Supprimer
                        </DeleteButton>
                        <Button variant="ghost" color="--neutral500" onPress={close}>
                            Annuler
                        </Button>
                    </Stack>
                </Stack>
            )}
        </Modal>
    );
};

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

DeleteBarberModal.propTypes = {
    onDelete: PropTypes.func,
    isLoading: PropTypes.bool,
};

DeleteBarberModal.defaultProps = {
    isLoading: false,
    onDelete: () => {},
};

export default DeleteBarberModal;
