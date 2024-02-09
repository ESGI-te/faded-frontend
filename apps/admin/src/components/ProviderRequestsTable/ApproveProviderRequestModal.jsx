import PropTypes from 'prop-types';
import Modal from 'shared/src/components/Modal';
import Text from 'shared/src/components/Text';
import styled from 'styled-components';
import Stack from 'shared/src/components/Stack';
import { icon } from '@fortawesome/fontawesome-svg-core/import.macro';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Button from 'shared/src/components/Button';
import dayjs from 'dayjs';
import { FormattedMessage } from 'react-intl';
import { formatPhoneNumber } from 'shared/src/utils/helpers';

const ApproveProviderRequestModal = ({ onApprove, isLoading, request, isOpen, onOpenChange }) => (
    <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        isDismissable={false}
        isKeyboardDismissDisabled={true}
    >
        <Stack gap="2rem">
            <ModalHeader>
                <IconWrapper>
                    <CheckIcon icon={icon({ name: 'circle-check', style: 'solid' })} />
                </IconWrapper>
                <Text variant="headingM" fontWeight="--fw-bold" align="center">
                    <FormattedMessage defaultMessage="Êtes-vous sûr de vouloir approuver cette demande ?" />
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
                <Button onPress={onApprove} isLoading={isLoading}>
                    <FormattedMessage defaultMessage="Oui, confirmer" />
                </Button>
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
const CheckIcon = styled(FontAwesomeIcon)`
    font-size: 1rem;
    color: var(--success500);
`;
const IconWrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 3rem;
    height: 3rem;
    border-radius: var(--r-m);
    background-color: var(--success50);
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

ApproveProviderRequestModal.propTypes = {
    onApprove: PropTypes.func,
    isLoading: PropTypes.bool,
    request: PropTypes.object,
    onClose: PropTypes.func,
    isOpen: PropTypes.bool,
    onOpenChange: PropTypes.func,
};

ApproveProviderRequestModal.defaultProps = {
    isLoading: false,
    onApprove: () => {},
};

export default ApproveProviderRequestModal;
