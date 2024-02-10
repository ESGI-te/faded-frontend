import Alert from 'shared/src/components/Alert';
import Text from 'shared/src/components/Text';
import { UI_VARIANTS } from 'shared/src/utils/constants';
import { FormattedMessage } from 'react-intl';
import useEstablishmentQuery from 'shared/src/queries/establishment/useEstablishmentQuery.hook';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import placeholderIllustration from 'shared/src/assets/images/placeholder-img.png';
import Button from 'shared/src/components/Button';
import useDeleteEstablishmentMutation from 'shared/src/queries/establishment/useDeleteEstablishmentMutation.hook';
import { useNavigate } from 'react-router-dom';
import { DialogTrigger } from 'react-aria-components';
import EstablishmentDeleteModal from './EstablishmentDeleteModal';

const EstablishmentDelete = () => {
    const { establishmentId } = useParams();
    const { data: establishment, isLoading } = useEstablishmentQuery(establishmentId);
    const deleteEstablishment = useDeleteEstablishmentMutation();
    const navigate = useNavigate();

    const handleDelete = () => {
        deleteEstablishment.mutate(establishmentId, {
            onSuccess: () => {
                navigate('/establishments');
            },
        });
    };

    if (isLoading) return <div>Loading...</div>; // TODO: add a loader

    return (
        <Wrapper>
            <EstablishmentImg src={placeholderIllustration} />
            <Inner>
                <Text variant="bodyL" fontWeight="--fw-semibold">
                    {establishment?.name}
                </Text>
                <Alert variant={UI_VARIANTS.ALERT}>
                    <Text color="--alert" fontWeight="--fw-semibold">
                        <FormattedMessage defaultMessage="Êtes-vous sûr de vouloir supprimer cet établissement ? Cette action est irréversible" />
                    </Text>
                </Alert>
                <DialogTrigger>
                    <DeleteButton>
                        <FormattedMessage defaultMessage="Oui, supprimer" />
                    </DeleteButton>
                    <EstablishmentDeleteModal
                        onDelete={handleDelete}
                        isLoading={deleteEstablishment.isLoading}
                    />
                </DialogTrigger>
            </Inner>
        </Wrapper>
    );
};

const Wrapper = styled.div`
    display: flex;
    align-items: start;
    column-gap: 1.5rem;
`;
const EstablishmentImg = styled.img`
    width: 10rem;
    height: 10rem;
    object-fit: cover;
    border-radius: var(--r-m);
`;
const DeleteButton = styled(Button)`
    background-color: var(--alert);
    width: fit-content;
    margin-top: auto;
`;
const Inner = styled.div`
    display: flex;
    flex-direction: column;
    row-gap: 0.5rem;
    align-self: stretch;
`;

export default EstablishmentDelete;
