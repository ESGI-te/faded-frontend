import InputSelect from 'shared/src/components/InputSelect';
import Text from 'shared/src/components/Text';
import { useSelectedEstablishment } from '@contexts/SelectedEstablishmentProvider';
import useEstablishmentsQuery from 'shared/src/queries/establishment/useEstablishmentsQuery.hook';
import { ListBoxItem } from 'react-aria-components';
import styled from 'styled-components';
import { USER_ROLES } from 'shared/src/utils/constants';
import useUserQuery from 'shared/src/queries/user/useUserQuery.hook';

const SelectEstablishment = () => {
    const { data: user } = useUserQuery();
    const { data: establishments } = useEstablishmentsQuery();
    const { establishment, onSelectEstablishment } = useSelectedEstablishment();
    const isBarber = user && user.roles.includes(USER_ROLES.BARBER);

    const items = establishments?.data?.map((establishment) => ({
        id: establishment.id,
        name: establishment.name,
        image: 'https://cdn1.treatwell.net/images/view/v2.i3867704.w720.h480.xB88E4050/',
    }));

    return (
        <InputSelect
            onSelectionChange={onSelectEstablishment}
            items={items}
            selectedKey={establishment || ''}
            placeholder="Établissement"
            isDisabled={!establishments || isBarber}
        >
            {(item) => (
                <EstablishmentSelectListItem id={item.id}>
                    <EstablishmentSelectListItemInnerWrapper>
                        <EstablishmentImage src={item.image} />
                        <EstablishmentListItemName slot="label">
                            {item.name}
                        </EstablishmentListItemName>
                    </EstablishmentSelectListItemInnerWrapper>
                </EstablishmentSelectListItem>
            )}
        </InputSelect>
    );
};

const EstablishmentSelectListItem = styled(ListBoxItem)`
    border-radius: var(--r-xs);
    padding: 0.25rem;
    cursor: pointer;
    min-width: 0;

    &[data-selected] {
        background-color: var(--primary400);

        [slot='label'] {
            color: var(--white);
            font-weight: var(--fw-semibold);
        }
    }

    &:hover:not([data-selected]) {
        background-color: var(--primary50);
    }

    &[data-focused] {
        outline: none;
    }

    &[data-focus-visible] {
        outline: 2px solid var(--primary500);
    }
`;
const EstablishmentSelectListItemInnerWrapper = styled.div`
    display: flex;
    align-items: center;
    column-gap: 0.5rem;
    min-width: 0;
`;
const EstablishmentListItemName = styled(Text)`
    flex-grow: 1;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    min-width: 0;
`;
const EstablishmentImage = styled.img`
    width: 2rem;
    height: 2rem;
    border-radius: var(--r-s);
    flex-basis: 2rem;
`;

export default SelectEstablishment;
