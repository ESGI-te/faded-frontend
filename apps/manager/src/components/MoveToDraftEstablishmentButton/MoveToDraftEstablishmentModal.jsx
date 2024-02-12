import Modal from 'shared/src/components/Modal';
import Text from 'shared/src/components/Text';
import styled from 'styled-components';
import Stack from 'shared/src/components/Stack';
import { icon } from '@fortawesome/fontawesome-svg-core/import.macro';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { FormattedMessage } from 'react-intl';
import MoveToDraftEstablishment from '@components/MoveToDraftEstablishment';
import { UI_VARIANTS } from 'shared/src/utils/constants';
import Alert from 'shared/src/components/Alert';

const MoveToDraftEstablishmentModal = () => {
    return (
        <Modal size="small" isDismissable={false} isKeyboardDismissDisabled={true}>
            {({ close }) => (
                <Stack gap="2rem">
                    <ModalHeader>
                        <IconWrapper>
                            <TrashIcon icon={icon({ name: 'rocket', style: 'solid' })} />
                        </IconWrapper>
                        <Text align="center" variant="headingS" fontWeight="--fw-bold">
                            <FormattedMessage defaultMessage="Souhaitez-vous passer en brouillon cet établissement ?" />
                        </Text>
                    </ModalHeader>
                    <Alert variant={UI_VARIANTS.WARNING}>
                        <Text fontWeight="--fw-semibold">
                            <FormattedMessage defaultMessage="Celui-ci ne sera plus en ligne et pourra être édité à tout moment." />
                        </Text>
                    </Alert>
                    <MoveToDraftEstablishment onClose={close} />
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
    color: var(--warning);
`;
const IconWrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 3rem;
    height: 3rem;
    border-radius: var(--r-m);
    background-color: var(--warning50);
`;

export default MoveToDraftEstablishmentModal;
