import EstablishmentForm from '@components/EstablishmentForm';
import useEstablishmentQuery from 'shared/src/queries/establishment/useEstablishmentQuery.hook';
import styled from 'styled-components';
import { useParams } from 'react-router-dom';
import EstablishmentFormPageSkeleton from './EstablishmentFormPageSkeleton';
import EstablishmentFormProvider from '@components/EstablishmentForm/EstablishmentFormProvider';

const EstablishmentFormPage = () => {
    const { establishmentId } = useParams();
    const { data: establishment, isLoading } = useEstablishmentQuery(establishmentId);

    if (isLoading) return <EstablishmentFormPageSkeleton />;

    return (
        <Page>
            <EstablishmentFormProvider establishment={establishment}>
                <EstablishmentForm />
            </EstablishmentFormProvider>
        </Page>
    );
};

const Page = styled.section`
    background-color: var(--neutral50);
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;
    min-height: inherit;

    ${({ theme }) => theme.mediaQueries.desktopAndUp} {
        background-color: var(--white);
    }
`;

export default EstablishmentFormPage;
