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
import { FormattedMessage } from 'react-intl';
import { formatPhoneNumber } from 'shared/src/utils/helpers';

const RejectProviderRequestModal = ({ onReject, isLoading, request, isOpen, onOpenChange }) => (
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
                <Text variant="headingM" fontWeight="--fw-bold" align="center">
                    <FormattedMessage defaultMessage="Souhaitez-vous refuser cette demande ?" />
                </Text>
            </ModalHeader>
            <RequestWrapper>
            <Stack gap="0.25rem">
                    <Text fontWeight="--fw-semibold">{request.companyName}</Text>
                    <Text>
                        <FormattedMessage defaultMessage="Demande faite le {date} à {time}" values={{
                            date: dayjs(request.createdAt).format('DD/MM/YYYY'),
                            time: dayjs(request.createdAt).format('HH:mm')
                        }}/> 
                    </Text>                    
                    <Text>{request.firstName} {request.lastName}</Text>
                    <Text>{request.companyAddress}</Text>
                    <Text>{request.professionalEmail}</Text>
                    <Text>{formatPhoneNumber(request.phone)}</Text>
                </Stack>
            </RequestWrapper>
            <Stack gap="0.5rem">
                <DeleteButton onPress={onReject} isLoading={isLoading}>
                    <FormattedMessage defaultMessage="Oui, refuser" />
                </DeleteButton>
                <Button variant="ghost" color="--neutral500" onPress={() => onOpenChange(false)}>
                    <FormattedMessage defaultMessage="Annuler" />
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
const RequestWrapper = styled.div`
    display: flex;
    flex-direction: column;
    row-gap: 0.5rem;
    border-radius: var(--r-s);
    border: solid 1px var(--neutral300);
    padding: 0.75rem;
`;
const RequestIcon = styled(FontAwesomeIcon)`
    font-size: 0.75rem;
    color: var(--neutral500);
`;

RejectProviderRequestModal.propTypes = {
    onReject: PropTypes.func,
    isLoading: PropTypes.bool,
    request: PropTypes.object,
    onClose: PropTypes.func,
    isOpen: PropTypes.bool,
    onOpenChange: PropTypes.func,
};

RejectProviderRequestModal.defaultProps = {
    isLoading: false,
    onReject: () => {},
};

export default RejectProviderRequestModal;
