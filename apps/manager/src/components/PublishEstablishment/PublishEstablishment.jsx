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
import { ESTABLISHMENT_STATUS } from 'shared/src/utils/constants';
import useUpdateEstablishmentStatusMutation from '@queries/establishment/useUpdateEstablishmentStatusMutation.hook';
import Text from 'shared/src/components/Text';
import Spinner from 'shared/src/components/Spinner';

const PublishEstablishment = ({ onClose }) => {
    const { establishmentId } = useParams();
    const { data: establishment, isFetching } = useEstablishmentQuery(establishmentId, {
        staleTime: 0,
    });
    const steps = useEstablishmentPublishQuestSteps(establishment);
    const isDisabled = steps.some((step) => !step.check);
    const updateEstablishmentStatus = useUpdateEstablishmentStatusMutation();

    const handlePublish = () => {
        if (isDisabled || establishment?.status !== ESTABLISHMENT_STATUS.DRAFT) return;

        updateEstablishmentStatus.mutate(
            {
                establishmentId,
                status: ESTABLISHMENT_STATUS.ACTIVE,
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
            {isFetching ? (
                <Spinner color="--primary" />
            ) : isDisabled ? (
                <PublishEstablishmentQuest onClose={onClose} steps={steps} />
            ) : (
                <Text align="center" color="--neutral500">
                    <FormattedMessage defaultMessage="Votre établissement sera en ligne et prêt à accueillir des clients !" />
                </Text>
            )}
            <ActionWrapper>
                <Button
                    startIcon={<FontAwesomeIcon icon={icon({ name: 'rocket', style: 'solid' })} />}
                    isDisabled={isFetching || isDisabled}
                    onPress={handlePublish}
                    isLoading={updateEstablishmentStatus.isLoading}
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
