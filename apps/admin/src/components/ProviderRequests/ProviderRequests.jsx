import useProviderRequestsQuery from '@queries/providerRequest/useProviderRequestsQuery.hook';
import ProviderRequestsTable from '@components/ProviderRequestsTable';
import Stack from 'shared/src/components/Stack';
import Pagination from 'shared/src/components/Pagination';
import { createSearchParams, useSearchParams } from 'react-router-dom';
import { useMemo } from 'react';
import InputSearch from 'shared/src/components/InputSearch';
import { icon } from '@fortawesome/fontawesome-svg-core/import.macro';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styled from 'styled-components';
import TableSkeleton from 'shared/src/components/TableSkeleton';

const ProviderRequests = () => {
    let [searchParams, setSearchParams] = useSearchParams();
    const params = useMemo(() => Object.fromEntries([...searchParams]), [searchParams]);
    const { data, isLoading } = useProviderRequestsQuery({
        page: params.page || 1,
        companyName: params.companyName,
    });

    const handleSearchByCompanyName = (data) => {
        setSearchParams(
            createSearchParams({
                companyName: data,
            }),
        );
    };

    return (
        <Stack gap="1rem">
            <InputSearchWrapper>
                <InputSearchStyled
                    name="companyName"
                    startIcon={
                        <SearchIcon icon={icon({ name: 'magnifying-glass', style: 'solid' })} />
                    }
                    onSubmit={handleSearchByCompanyName}
                />
            </InputSearchWrapper>
            {!isLoading ? (
                <>
                    <ProviderRequestsTable items={data.data} />
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

export default ProviderRequests;
