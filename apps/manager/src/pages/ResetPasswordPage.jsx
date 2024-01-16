import ResetPassword from '@components/ResetPassword';
import styled from 'styled-components';
import Text from 'shared/src/components/Text';

const ResetPasswordPage = () => {
    return (
        <Page>
            <PageInnerWrapper>
                <Title>Ajouter un mot de passe : </Title>
                <Text variant="bodyL">
                    Pour garantir la sécurité de votre compte, veuillez définir un nouveau mot de
                    passe personnel.
                </Text>
                <ResetPassword />
            </PageInnerWrapper>
        </Page>
    );
};

const Page = styled.section`
    min-height: 100%;
    width: 100%;
    display: flex;
    background-color: var(--neutral50);
    justify-content: center;
    ${({ theme }) => theme.mediaQueries.desktopAndUp} {
        justify-content: left;
    }
`;

const PageInnerWrapper = styled.div`
    width: 100%;
    background-color: var(--neutral50);
    padding: var(--container-padding-mobile);
    display: flex;
    flex-direction: column;
    row-gap: 1rem;

    ${({ theme }) => theme.mediaQueries.desktopAndUp} {
        row-gap: 2rem;
        padding: var(--container-padding);
    }
`;

const Title = styled(Text)`
    font-weight: var(--fw-bold);
    font-size: var(--fs-heading-l);
    line-height: var(--fs-heading-l);
    text-align: left;
`;

export default ResetPasswordPage;
