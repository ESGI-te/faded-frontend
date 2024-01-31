import PropTypes from 'prop-types';
import Modal from 'shared/src/components/Modal';
import Text from 'shared/src/components/Text';
import styled from 'styled-components';
import ModalCloseButton from 'shared/src/components/ModalCloseButton';
import Stack from 'shared/src/components/Stack';
import { FormattedMessage } from 'react-intl';
import ServiceForm from '@components/ServiceForm';

const EditServiceModal = ({ onSubmit, service, isLoading, ...props }) => {
    return (
        <Modal {...props} size="large">
            {({ close }) => (
                <Stack gap="1.5rem">
                    <ModalHeader>
                        <Stack gap="0.25rem">
                            <Text variant="headingM" fontWeight="--fw-bold">
                                <FormattedMessage defaultMessage="Modifier une prestation" />
                            </Text>
                            <Text color="--neutral500">
                                <FormattedMessage defaultMessage="Cela peut inclure le nom de la prestation, le prix, la durée, et toute autre information pertinente." />
                            </Text>
                        </Stack>
                        <ModalCloseButton onPress={close} />
                    </ModalHeader>
                    <ServiceForm
                        onClose={close}
                        onSubmit={onSubmit}
                        service={service}
                        isLoading={isLoading}
                    />
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

EditServiceModal.propTypes = {
    onSubmit: PropTypes.func.isRequired,
    service: PropTypes.object,
    onOpenChange: PropTypes.func,
    isOpen: PropTypes.bool.isRequired,
    isLoading: PropTypes.bool,
};

EditServiceModal.defaultProps = {
    isOpen: false,
    isLoading: false,
    onOpenChange: () => {},
    onSubmit: () => {},
};

export default EditServiceModal;
