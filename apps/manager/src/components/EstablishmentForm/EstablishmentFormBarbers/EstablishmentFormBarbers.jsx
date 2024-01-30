import { useMemo } from 'react';
import Stack from 'shared/src/components/Stack';
import { FormattedMessage } from 'react-intl';
import { useFieldArray, useFormContext } from 'react-hook-form';
import Text from 'shared/src/components/Text';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { icon } from '@fortawesome/fontawesome-svg-core/import.macro';
import IconButton from 'shared/src/components/IconButton';
import useBarbersQuery from 'shared/src/queries/barber/useBarbersQuery.hook';
import EstablishmentFormAccordionNextStepButton from '../EstablishmentFormAccordion/EstablishmentFormAccordionNextStepButton';
import ComboBox from 'shared/src/components/ComboBox';
import ListBoxItem from 'shared/src/components/ListBoxItem';
import Link from 'shared/src/components/Link';

const EstablishmentFormBarbers = () => {
    const { control } = useFormContext();
    const { append, remove, fields } = useFieldArray({ control, name: 'barbers' });
    const barbers = useBarbersQuery();
    const barbersItems = useMemo(() => {
        return (
            barbers.data?.data
                .filter((barber) => !barber.establishment)
                .map((barber) => ({
                    id: barber.id,
                    name: `${barber.firstName} ${barber.lastName}`,
                })) || []
        );
    }, [barbers.data?.data]);

    const handleAddBarber = (barberId) => {
        const barber = barbers.data?.data.find((b) => b.id === barberId);
        append(barber);
    };

    return (
        <>
            <Stack gap="1.5rem">
                {barbersItems.length === 0 ? (
                    <EmptyStateWrapper>
                        <Text fontWeight="--fw-semibold">
                            <FormattedMessage defaultMessage="Il semblerait que vous n'ayez pas de barber disponible !" />
                        </Text>
                        <Text>
                            <FormattedMessage
                                defaultMessage="Créez l'image parfaite de votre salon <link>en ajoutant</link> votre équipe de talent. C'est le moment de mettre en avant leur savoir-faire et leur style unique 💇🏻‍♀️"
                                values={{
                                    link: (chunks) => <BarbersLink>{chunks}</BarbersLink>,
                                }}
                            />
                        </Text>
                    </EmptyStateWrapper>
                ) : (
                    <>
                        <ComboBox
                            selectedKey={null}
                            onSelectionChange={handleAddBarber}
                            isLoading={barbers.isFetching}
                            defaultItems={barbersItems}
                        >
                            {(item) => <ListBoxItem {...item} />}
                        </ComboBox>
                        <Stack gap="0.5rem">
                            {fields.map((barber, index) => (
                                <Barber key={index}>
                                    <TextEllipsis numberOfLines={1}>
                                        {barber.firstName} {barber.lastName}
                                    </TextEllipsis>
                                    <BarberActionButton
                                        onPress={() => remove(index)}
                                        variant="ghost"
                                        icon={
                                            <BarberActionTrashIcon
                                                icon={icon({ name: 'trash', style: 'solid' })}
                                            />
                                        }
                                    />
                                </Barber>
                            ))}
                        </Stack>
                    </>
                )}

                <EstablishmentFormAccordionNextStepButton />
            </Stack>
        </>
    );
};

const EmptyStateWrapper = styled.div`
    width: 100%;
    border-radius: var(--r-m);
    background-color: var(--primary50);
    padding: 1rem;
    display: flex;
    flex-direction: column;
    row-gap: 0.5rem;
`;
const BarbersLink = styled(Link)`
    color: var(--primary500);
    font-weight: var(--fw-semibold);
    cursor: pointer;
`;
const BarberActionTrashIcon = styled(FontAwesomeIcon)`
    width: 0.75rem;
    height: 0.75rem;
    color: var(--alert);
`;
const BarberActionButton = styled(IconButton)`
    border-radius: var(--r-full);

    &[data-hovered] {
        background-color: var(--neutral100);
    }
`;
const TextEllipsis = styled(Text)`
    flex-grow: 1;
    min-width: 0;
`;
const Barber = styled.div`
    display: flex;
    align-items: center;
    column-gap: 1rem;
    border-radius: var(--r-m);
    padding: 0.75rem;
    background-color: var(--neutral50);
`;

export default EstablishmentFormBarbers;
