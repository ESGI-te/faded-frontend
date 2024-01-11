import { createSearchParams, useSearchParams } from 'react-router-dom';
import { icon } from '@fortawesome/fontawesome-svg-core/import.macro';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Pagination from '@components/Pagination';
import TableSkeleton from '@components/TableSkeleton';
import styled from 'styled-components';
import InputSearch from '@components/InputSearch';
import Stack from '@components/Stack';
import AppointmentsTable from '@components/AppointmentsTable';
import useAppointmentsQuery from '@queries/appointment/useAppointementsQuery.hook';
import { useSelectedEstablishment } from '@contexts/SelectedEstablishmentProvider';

const Appointments = () => {
    const { establishment } = useSelectedEstablishment();
    let [searchParams, setSearchParams] = useSearchParams();
    const page = searchParams.get('page') || 1;
    const search = searchParams.get('search');
    const { data, isLoading } = useAppointmentsQuery({
        establishment,
        page,
        search,
    });

    const handleSearch = (search) => {
        setSearchParams(createSearchParams({ search }));
    };

    return (
        <Stack gap="1rem">
            <InputSearchStyled
                name="search"
                startIcon={<SearchIcon icon={icon({ name: 'magnifying-glass', style: 'solid' })} />}
                onSubmit={handleSearch}
                defaultValue={search}
            />
            {!isLoading ? (
                <>
                    <AppointmentsTable items={data.data} />
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
const InputSearchStyled = styled(InputSearch)`
    max-width: 30rem;
`;

Appointments.propTypes = {};

export default Appointments;
