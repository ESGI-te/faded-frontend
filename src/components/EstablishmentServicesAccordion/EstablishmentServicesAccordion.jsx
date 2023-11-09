import React from 'react';
import PropTypes from 'prop-types';
import Accordion from '@components/Accordion';
import AccordionItem from '@components/AccordionItem';
import AccordionButton from '@components/AccordionButton';
import AccordionPanel from '@components/AccordionPanel';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styled, { css } from 'styled-components';
import { icon } from '@fortawesome/fontawesome-svg-core/import.macro';
import Text from '@components/Text';
import { useAccordionItem } from '@components/AccordionItem/useAccordionItem.hook';
import Cluster from '@components/Cluster';
import { Separator } from 'react-aria-components';
import Button from '@components/Button';

const AccordionItemButton = ({ label }) => {
    const { isExpanded } = useAccordionItem();
    return (
        <AccordionButtonStyled>
            <Text variant="headingS" fontWeight="--fw-semibold">
                {label}
            </Text>
            <ChevronIcon
                isExpanded={isExpanded}
                icon={icon({ name: 'chevron-down', style: 'solid' })}
            />
        </AccordionButtonStyled>
    );
};

const EstablishmentServicesAccordion = ({ services }) => {
    const servicesByCategory = services.reduce((acc, item) => {
        const categoryName = item.category.name;
        if (!acc[categoryName]) {
            acc[categoryName] = { category: item.category, services: [] };
        }
        acc[categoryName].services.push(item);
        return acc;
    }, {});
    const items = Object.values(servicesByCategory);

    return (
        <ServicesAccordion>
            {items.map((item) => (
                <AccordionItem key={item.category.id}>
                    <AccordionItemInnerWrapper>
                        <AccordionItemButton label={item.category.name} />
                        <AccordionPanel>
                            <ServicesWrapper>
                                {item.services.map((service) => (
                                    <Service key={service.id}>
                                        <Text variant="bodyL">{service.name}</Text>
                                        <ServiceInnerWrapper>
                                            <Cluster
                                                gap="0.5rem"
                                                align="center"
                                                justify="space-between"
                                            >
                                                <Text color="--neutral500">
                                                    {service.duration} min
                                                </Text>
                                                <Divider />
                                                <Text color="--neutral500">{service.price} €</Text>
                                            </Cluster>
                                            <ServiceButton size="small">Choisir</ServiceButton>
                                        </ServiceInnerWrapper>
                                    </Service>
                                ))}
                            </ServicesWrapper>
                        </AccordionPanel>
                    </AccordionItemInnerWrapper>
                </AccordionItem>
            ))}
        </ServicesAccordion>
    );
};

const ServicesAccordion = styled(Accordion)`
    row-gap: 0.5rem;
`;
const ChevronIcon = styled(FontAwesomeIcon)`
    width: 1rem;
    height: 1rem;
    transition: transform 0.3s ease;

    ${({ isExpanded }) =>
        isExpanded &&
        css`
            transform: rotate(180deg);
        `}
`;
const AccordionButtonStyled = styled(AccordionButton)`
    width: 100%;
    padding: 1rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    cursor: pointer;
`;
const AccordionItemInnerWrapper = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    background-color: var(--white);
    border-radius: var(--r-s);
`;
const ServicesWrapper = styled.div`
    display: flex;
    flex-direction: column;
    padding-inline: 1rem;
    padding-bottom: 1rem;
`;
const Service = styled.div`
    display: flex;
    flex-direction: column;
    row-gap: 0.5rem;

    &:not(:last-child) {
        border-bottom: 1px solid var(--neutral100);
        padding-bottom: 1rem;
    }

    &:not(:first-child) {
        padding-top: 1rem;
    }

    ${({ theme }) => theme.mediaQueries.desktopAndUp} {
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
        column-gap: 1rem;
    }
`;
const Divider = styled(Separator)`
    width: 0.25rem;
    height: 0.25rem;
    background-color: var(--neutral300);
    border-radius: var(--r-full);
`;
const ServiceInnerWrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    column-gap: 1rem;

    ${({ theme }) => theme.mediaQueries.desktopAndUp} {
        column-gap: 2rem;
    }
`;
const ServiceButton = styled(Button)`
    background-color: var(--black);
`;

EstablishmentServicesAccordion.propTypes = {
    services: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.number.isRequired,
            name: PropTypes.string.isRequired,
            price: PropTypes.number.isRequired,
            duration: PropTypes.number.isRequired,
            category: PropTypes.shape({
                id: PropTypes.number.isRequired,
                name: PropTypes.string.isRequired,
            }),
        }),
    ),
};

export default EstablishmentServicesAccordion;
