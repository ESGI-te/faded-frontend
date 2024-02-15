import useEstablishmentsQuery from 'shared/src/queries/establishment/useEstablishmentsQuery.hook';
import EstablishmentsTable from '@components/EstablishmentsTable';
import Stack from 'shared/src/components/Stack';
import Pagination from 'shared/src/components/Pagination';
import { createSearchParams, useSearchParams } from 'react-router-dom';
import InputSearch from 'shared/src/components/InputSearch';
import { icon } from '@fortawesome/fontawesome-svg-core/import.macro';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styled from 'styled-components';
import Button from 'shared/src/components/Button';
import { DialogTrigger } from 'react-aria-components';
import TableSkeleton from 'shared/src/components/TableSkeleton';
import CreateEstablishmentModal from '@components/CreateEstablishmentModal';
import { FormattedMessage } from 'react-intl';

const Establishments = () => {
    let [searchParams, setSearchParams] = useSearchParams();
    const { data, isLoading } = useEstablishmentsQuery({
        page: searchParams.get('page') || 1,
        perPage: 12,
        name: searchParams.get('name'),
    });

    const handleSearchByLastName = (name) => {
        setSearchParams(
            createSearchParams({
                name,
            }),
        );
    };

    return (
        <Stack gap="1rem">
            <InputSearchWrapper>
                <InputSearchStyled
                    name="name"
                    startIcon={
                        <SearchIcon icon={icon({ name: 'magnifying-glass', style: 'solid' })} />
                    }
                    onSubmit={handleSearchByLastName}
                />
                <DialogTrigger>
                    <Button
                        startIcon={<AddIcon icon={icon({ name: 'plus', style: 'solid' })} />}
                        backgroundColor="--black"
                    >
                        <FormattedMessage defaultMessage="Ajouter" />
                    </Button>
                    <CreateEstablishmentModal />
                </DialogTrigger>
            </InputSearchWrapper>
            {!isLoading ? (
                <>
                    <EstablishmentsTable establishments={data.data} />
                    <Pagination pagination={data.pagination} pagesRange={5} />
                </>
            ) : (
                <TableSkeleton />
            )}
        </Stack>
    );
};

const SearchIcon = styled(FontAwesomeIcon)`
    font-size: 0.875rem;
    color: var(--neutral500);
`;
const InputSearchWrapper = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    row-gap: 0.5rem;

    ${({ theme }) => theme.mediaQueries.desktopAndUp} {
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        column-gap: 1rem;
    }
`;
const AddIcon = styled(FontAwesomeIcon)`
    font-size: 1rem;
    color: var(--white);
`;
const InputSearchStyled = styled(InputSearch)`
    max-width: 30rem;
`;

export default Establishments;
