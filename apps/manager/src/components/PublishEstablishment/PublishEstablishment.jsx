import PropTypes from 'prop-types';
import useEstablishmentQuery from 'shared/src/queries/establishment/useEstablishmentQuery.hook';
import { useParams } from 'react-router-dom';
import Stack from 'shared/src/components/Stack';
import styled from 'styled-components';
import Button from 'shared/src/components/Button';
import PublishEstablishmentQuest from './PublishEstablishmentQuest';
import useEstablishmentPublishQuestSteps from './useEstablishmentPublishQuestSteps.hook';
import { FormattedMessage } from 'react-intl';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { icon } from '@fortawesome/fontawesome-svg-core/import.macro';
import useUpdateEstablishmentMutation from '@queries/establishment/useUpdateEstablishmentMutation.hook';
import { ESTABLISHMENT_STATUS } from 'shared/src/utils/constants';

const PublishEstablishment = ({ onClose }) => {
    const { establishmentId } = useParams();
    const { data: establishment } = useEstablishmentQuery(establishmentId);
    const steps = useEstablishmentPublishQuestSteps(establishment);
    const isDisabled = steps.some((step) => !step.check);
    const updateEstablishment = useUpdateEstablishmentMutation();

    const handlePublish = () => {
        if (isDisabled || establishment?.status !== ESTABLISHMENT_STATUS.DRAFT) return;

        updateEstablishment.mutate(
            {
                establishmentId,
                establishment: {
                    status: ESTABLISHMENT_STATUS.ACTIVE,
                },
            },
            {
                onSuccess: () => {
                    onClose();
                },
            },
        );
    };

    return (
        <Stack gap="2.5rem">
            <PublishEstablishmentQuest onClose={onClose} steps={steps} />
            <ActionWrapper>
                <Button
                    startIcon={<FontAwesomeIcon icon={icon({ name: 'rocket', style: 'solid' })} />}
                    isDisabled={isDisabled}
                    onPress={handlePublish}
                    isLoading={updateEstablishment.isLoading}
                >
                    <FormattedMessage defaultMessage="Publier" />
                </Button>
                <Button variant="ghost" color="--neutral500" onPress={onClose}>
                    <FormattedMessage defaultMessage="Annuler" />
                </Button>
            </ActionWrapper>
        </Stack>
    );
};

const ActionWrapper = styled.div`
    display: flex;
    flex-direction: column;
    row-gap: 0.5rem;
    /* 
    ${({ theme }) => theme.mediaQueries.desktopAndUp} {
        flex-direction: row;
        column-gap: 0.5rem;
        justify-content: flex-end;

        & > :first-child {
            order: 1;
        }

        & > * {
            width: fit-content;
        }
    } */
`;

PublishEstablishment.propTypes = {
    onClose: PropTypes.func,
};

PublishEstablishment.defaultProps = {
    onClose: () => {},
};

export default PublishEstablishment;
