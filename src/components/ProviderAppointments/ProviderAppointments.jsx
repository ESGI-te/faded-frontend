import { useMemo } from 'react';
import PropTypes from 'prop-types';
import useAppointmentsQuery from '@queries/appointment/useAppointementsQuery.hook';
import { createSearchParams, useSearchParams } from 'react-router-dom';
import { icon } from '@fortawesome/fontawesome-svg-core/import.macro';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Pagination from '@components/Pagination';
import TableSkeleton from '@components/TableSkeleton';
import styled from 'styled-components';
import InputSearch from '@components/InputSearch';
import Stack from '@components/Stack';
import ProviderAppointmentsTable from '@components/ProviderAppointmentsTable';

const ProviderAppointments = () => {
    let [searchParams, setSearchParams] = useSearchParams();
    const page = searchParams.get('page') || 1;
    const search = searchParams.get('search');
    const { data, isLoading } = useAppointmentsQuery({
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
                    <ProviderAppointmentsTable items={data.data} />
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

ProviderAppointments.propTypes = {};

export default ProviderAppointments;
