import useBarbersQuery from '@queries/barber/useBarbersQuery.hook';
import BarbersTable from '@components/BarbersTable';
import Stack from '@components/Stack';
import Pagination from '@components/Pagination';
import { createSearchParams, useSearchParams } from 'react-router-dom';
import { useMemo } from 'react';
import InputSearch from '@components/InputSearch';
import { icon } from '@fortawesome/fontawesome-svg-core/import.macro';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styled from 'styled-components';
import CreateBarberModal from '@components/CreateBarberModal';
import Button from '@components/Button';
import { DialogTrigger } from 'react-aria-components';
import TableSkeleton from '@components/TableSkeleton';
import { useSelectedEstablishment } from '@contexts/SelectedEstablishmentProvider';

const Barbers = () => {
    const { establishment } = useSelectedEstablishment();
    let [searchParams, setSearchParams] = useSearchParams();
    const params = useMemo(() => Object.fromEntries([...searchParams]), [searchParams]);
    const { data, isLoading } = useBarbersQuery({
        page: params.page || 1,
        lastName: params.lastName,
        establishment,
    });

    const handleSearchByLastName = (data) => {
        setSearchParams(
            createSearchParams({
                lastName: data,
            }),
        );
    };

    return (
        <Stack gap="1rem">
            <InputSearchWrapper>
                <InputSearchStyled
                    name="lastName"
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
                        Ajouter
                    </Button>
                    <CreateBarberModal />
                </DialogTrigger>
            </InputSearchWrapper>
            {!isLoading ? (
                <>
                    <BarbersTable items={data.data} />
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

export default Barbers;
