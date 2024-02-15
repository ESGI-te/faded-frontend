// import { useMemo } from 'react';
import useServicesQuery from 'shared/src/queries/service/useServicesQuery.hook';
import ServicesTable from '@components/ServicesTable';
import Stack from 'shared/src/components/Stack';
import Pagination from 'shared/src/components/Pagination';
import InputSearch from 'shared/src/components/InputSearch';
import { icon } from '@fortawesome/fontawesome-svg-core/import.macro';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styled from 'styled-components';
import Button from 'shared/src/components/Button';
import TableSkeleton from 'shared/src/components/TableSkeleton';
import useUserQuery from 'shared/src/queries/user/useUserQuery.hook';
import { USER_ROLES } from 'shared/src/utils/constants';
import AddServiceModal from './AddServiceModal';
import useCreateServiceMutation from '@queries/service/useCreateServiceMutation.hook';
import { useMemo, useState } from 'react';
import useDebounce from 'shared/src/hooks/useDebounce.hook';
import { FormattedMessage } from 'react-intl';

const Services = () => {
    const { data: services, isLoading } = useServicesQuery({ pagination: false });
    const { data: user } = useUserQuery();
    const isProvider = user?.roles?.includes(USER_ROLES.PROVIDER);
    const createService = useCreateServiceMutation();
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const debouncedSearchQuery = useDebounce(searchQuery);
    const items = useMemo(() => {
        let items = services;

        if (!items) return [];

        if (debouncedSearchQuery.length > 1) {
            items = items.filter((service) => {
                return (
                    service.name.toLowerCase().includes(debouncedSearchQuery.toLowerCase()) ||
                    service.category.name.toLowerCase().includes(debouncedSearchQuery.toLowerCase())
                );
            });
        }

        return items;
    }, [services, debouncedSearchQuery]);

    const handleAddService = (service) => {
        createService.mutate(service, {
            onSuccess: () => {
                setIsAddModalOpen(false);
            },
        });
    };

    return (
        <>
            <Stack gap="1rem">
                <InputSearchWrapper>
                    <InputSearchStyled
                        name="lastName"
                        startIcon={
                            <SearchIcon icon={icon({ name: 'magnifying-glass', style: 'solid' })} />
                        }
                        onChange={setSearchQuery}
                    />
                    {isProvider && (
                        <Button
                            startIcon={<AddIcon icon={icon({ name: 'plus', style: 'solid' })} />}
                            backgroundColor="--black"
                            onPress={() => setIsAddModalOpen(true)}
                        >
                            <FormattedMessage defaultMessage="Ajouter" />
                        </Button>
                    )}
                </InputSearchWrapper>
                {!isLoading ? (
                    <>
                        <ServicesTable items={items} />
                        {/* <Pagination pagination={data.pagination} pagesRange={5} /> */}
                    </>
                ) : (
                    <TableSkeleton />
                )}
            </Stack>
            <AddServiceModal
                isOpen={isAddModalOpen}
                onOpenChange={setIsAddModalOpen}
                onSubmit={handleAddService}
                isLoading={createService.isLoading}
            />
        </>
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

export default Services;
