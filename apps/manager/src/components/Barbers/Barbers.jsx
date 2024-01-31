import useBarbersQuery from 'shared/src/queries/barber/useBarbersQuery.hook';
import BarbersTable from '@components/BarbersTable';
import Stack from 'shared/src/components/Stack';
import Pagination from 'shared/src/components/Pagination';
import { createSearchParams, useSearchParams, useParams } from 'react-router-dom';
import { useMemo } from 'react';
import InputSearch from 'shared/src/components/InputSearch';
import { icon } from '@fortawesome/fontawesome-svg-core/import.macro';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styled from 'styled-components';
import CreateBarberModal from '@components/CreateBarberModal';
import Button from 'shared/src/components/Button';
import { DialogTrigger } from 'react-aria-components';
import TableSkeleton from 'shared/src/components/TableSkeleton';
import useUserQuery from 'shared/src/queries/user/useUserQuery.hook';
import { USER_ROLES } from 'shared/src/utils/constants';

const Barbers = () => {
    const { establishmentId } = useParams();
    let [searchParams, setSearchParams] = useSearchParams();
    const params = useMemo(() => Object.fromEntries([...searchParams]), [searchParams]);
    const { data, isLoading } = useBarbersQuery({
        page: params.page || 1,
        lastName: params.lastName,
        establishment: establishmentId,
    });
    const { data: user } = useUserQuery();
    const isProvider = user?.roles?.includes(USER_ROLES.PROVIDER);

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
                {isProvider && (
                    <DialogTrigger>
                        <Button
                            startIcon={<AddIcon icon={icon({ name: 'plus', style: 'solid' })} />}
                            backgroundColor="--black"
                        >
                            Ajouter
                        </Button>
                        <CreateBarberModal />
                    </DialogTrigger>
                )}
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
