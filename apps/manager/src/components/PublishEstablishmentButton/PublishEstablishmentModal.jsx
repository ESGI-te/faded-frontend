import Modal from 'shared/src/components/Modal';
import Text from 'shared/src/components/Text';
import styled from 'styled-components';
import Stack from 'shared/src/components/Stack';
import { icon } from '@fortawesome/fontawesome-svg-core/import.macro';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Button from 'shared/src/components/Button';
import { FormattedMessage } from 'react-intl';
import PublishEstablishment from '@components/PublishEstablishment';

const PublishEstablishmentModal = () => {
    return (
        <Modal isDismissable={false} isKeyboardDismissDisabled={true}>
            {({ close }) => (
                <Stack gap="2rem">
                    <ModalHeader>
                        <IconWrapper>
                            <TrashIcon icon={icon({ name: 'rocket', style: 'solid' })} />
                        </IconWrapper>
                        <Text variant="headingM" fontWeight="--fw-bold">
                            <FormattedMessage defaultMessage="Publier cet établissement" />
                        </Text>
                    </ModalHeader>
                    <PublishEstablishment onClose={close} />
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
    color: var(--primary);
`;
const IconWrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 3rem;
    height: 3rem;
    border-radius: var(--r-m);
    background-color: var(--primary50);
`;
const DeleteButton = styled(Button)`
    width: 100%;
    background-color: var(--alert50);
    color: var(--alert);
`;

export default PublishEstablishmentModal;
