import Modal from 'shared/src/components/Modal';
import Text from 'shared/src/components/Text';
import styled from 'styled-components';
import ModalCloseButton from 'shared/src/components/ModalCloseButton';
import Stack from 'shared/src/components/Stack';
import CreateEstablishmentForm from '@components/CreateEstablishmentForm';
import { FormattedMessage } from 'react-intl';

const CreateEstablishmentModal = () => {
    return (
        <Modal>
            {({ close }) => (
                <Stack gap="1.5rem">
                    <ModalHeader>
                        <Stack gap="0.25rem">
                            <Text variant="headingM" fontWeight="--fw-bold">
                                <FormattedMessage defaultMessage="Créons votre nouvel établissement." />
                            </Text>
                            <Text color="--neutral500">
                                <FormattedMessage defaultMessage="Choisissez un nom qui vous permettra de l'identifier facilement. Vous pourrez le modifier par la suite." />
                            </Text>
                        </Stack>
                        <ModalCloseButton onPress={close} />
                    </ModalHeader>
                    <CreateEstablishmentForm onCloseModal={close} />
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

export default CreateEstablishmentModal;
