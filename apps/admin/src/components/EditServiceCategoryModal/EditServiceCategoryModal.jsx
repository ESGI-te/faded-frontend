import PropTypes from 'prop-types';
import Modal from 'shared/src/components/Modal';
import Text from 'shared/src/components/Text';
import styled from 'styled-components';
import ModalCloseButton from 'shared/src/components/ModalCloseButton';
import EditServiceCategory from '@components/EditServiceCategory';
import Stack from 'shared/src/components/Stack';
import { FormattedMessage } from 'react-intl';

const EditServiceCategoryModal = ({ serviceCategory }) => {
    return (
        <Modal>
            {({ close }) => (
                <Stack gap="1.5rem">
                    <ModalHeader>
                        <Stack gap="0.25rem">
                            <Text variant="headingM" fontWeight="--fw-bold">
                                <FormattedMessage defaultMessage="Modifier une category" />
                            </Text>
                        </Stack>
                        <ModalCloseButton onPress={close} />
                    </ModalHeader>
                    <EditServiceCategory serviceCategory={serviceCategory} onCloseModal={close} />
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

EditServiceCategoryModal.propTypes = {
    serviceCategory: PropTypes.object.isRequired,
};

EditServiceCategoryModal.defaultProps = {
    onOpenChange: () => {},
};

export default EditServiceCategoryModal;
