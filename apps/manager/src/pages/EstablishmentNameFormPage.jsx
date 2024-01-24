import useCreateEstablishmentMutation from '@queries/establishment/useCreateEstablishmentMutation.hook';
import useUserQuery from 'shared/src/queries/user/useUserQuery.hook';
import { useNavigate } from 'react-router-dom';
import { USER_ROLES } from 'shared/src/utils/constants';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import styled from 'styled-components';
import { InputTextController } from 'shared/src/components/InputText';
import * as yup from 'yup';
import { FormattedMessage, useIntl } from 'react-intl';
import Text from 'shared/src/components/Text';
import Stack from 'shared/src/components/Stack';
import Button from 'shared/src/components/Button';
import Spinner from 'shared/src/components/Spinner';

const EstablishmentNameFormPage = () => {
    const schema = yup.object().shape({
        name: yup.string().required(),
    });
    const { control, handleSubmit, formState } = useForm({
        mode: 'onBlur',
        resolver: yupResolver(schema),
    });
    const { data: user } = useUserQuery();
    const isProvider = user?.roles?.includes(USER_ROLES.PROVIDER);
    const navigate = useNavigate();
    const createEstablishment = useCreateEstablishmentMutation();

    const onSubmit = (establishment) => {
        if (!isProvider) return;
        createEstablishment.mutate(establishment, {
            onSuccess: (establishment) => {
                navigate(`/${establishment.id}/edit`, { replace: true });
            },
        });
    };

    return (
        <Form onSubmit={handleSubmit(onSubmit)}>
            <Header>
                <Button variant="secondary">
                    <FormattedMessage defaultMessage="Annuler" />
                </Button>
                <Button
                    type="submit"
                    backgroundColor="--black"
                    isDisabled={!isProvider || !formState.isDirty}
                >
                    <FormattedMessage defaultMessage="Continuer" />
                </Button>
            </Header>
            <Inner>
                <ContentWrapper>
                    {createEstablishment.isLoading ? (
                        <Spinner />
                    ) : (
                        <>
                            <Stack>
                                <Text variant="headingL" fontWeight="--fw-bold">
                                    <FormattedMessage defaultMessage="Créons votre nouvel établissement." />
                                </Text>
                                <Text variant="bodyL" color="--neutral500">
                                    <FormattedMessage defaultMessage="Choisissez un nom qui vous permettra de l'identifier facilement. Vous pourrez le modifier par la suite." />
                                </Text>
                            </Stack>
                            <EstablishmentNameInput
                                control={control}
                                name="name"
                                placeholder="Mon super établissement"
                                label="Nom de l'établissement"
                            />
                        </>
                    )}
                </ContentWrapper>
            </Inner>
        </Form>
    );
};
const Form = styled.form`
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100dvh;
`;
const Header = styled.header`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: var(--container-padding-mobile);
    background-color: var(--background);

    ${({ theme }) => theme.mediaQueries.desktopAndUp} {
        padding: var(--container-padding);
        background-color: var(--white);
    }
`;
const Inner = styled.div`
    height: 100%;
    background-color: var(--background);
    display: flex;
    justify-content: center;
    align-items: start;

    ${({ theme }) => theme.mediaQueries.desktopAndUp} {
        margin-inline: var(--container-padding);
        border-radius: var(--r-l);
    }
`;
const EstablishmentNameInput = styled(InputTextController)`
    max-width: 500px;
`;
const ContentWrapper = styled.div`
    width: 100%;
    max-width: var(--container-width);
    padding: var(--container-padding-mobile);
    display: flex;
    flex-direction: column;
    row-gap: 2rem;

    ${({ theme }) => theme.mediaQueries.desktopAndUp} {
        padding: var(--container-padding);
    }
`;

export default EstablishmentNameFormPage;
