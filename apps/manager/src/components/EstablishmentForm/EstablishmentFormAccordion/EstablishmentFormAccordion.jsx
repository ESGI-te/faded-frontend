import Accordion from 'shared/src/components/Accordion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { icon } from '@fortawesome/fontawesome-svg-core/import.macro';
import styled from 'styled-components';
import Text from 'shared/src/components/Text';
import { FormattedMessage } from 'react-intl';
import EstablishmentFormAccordionItem from './EstablishmentFormAccordionItem';
import EstablishmentFormInformation from '../EstablishmentFormInformation';
import EstablishmentFormPlanning from '../EstablishmentFormPlanning';
import EstablishmentFormServices from '../EstablishmentFormServices/EstablishmentFormServices';
import EstablishmentFormBarbers from '../EstablishmentFormBarbers';

const EstablishmentFormAccordion = () => {
    return (
        <EstablishmentAccordion>
            <EstablishmentFormAccordionItem
                label={<FormattedMessage defaultMessage="Informations" />}
                icon={<ItemIcon icon={icon({ name: 'file-lines', style: 'solid' })} />}
            >
                <EstablishmentFormInformation />
            </EstablishmentFormAccordionItem>
            <EstablishmentFormAccordionItem
                label={<FormattedMessage defaultMessage="Horaires" />}
                icon={<ItemIcon icon={icon({ name: 'clock', style: 'solid' })} />}
            >
                <EstablishmentFormPlanning />
            </EstablishmentFormAccordionItem>
            <EstablishmentFormAccordionItem
                label={<FormattedMessage defaultMessage="Prestations" />}
                icon={<ItemIcon icon={icon({ name: 'wand-magic-sparkles', style: 'solid' })} />}
            >
                <EstablishmentFormServices />
            </EstablishmentFormAccordionItem>
            <EstablishmentFormAccordionItem
                label={<FormattedMessage defaultMessage="Équipe" />}
                icon={<ItemIcon icon={icon({ name: 'people-group', style: 'solid' })} />}
            >
                <EstablishmentFormBarbers />
            </EstablishmentFormAccordionItem>
            <EstablishmentFormAccordionItem
                label={<FormattedMessage defaultMessage="Photos" />}
                icon={<ItemIcon icon={icon({ name: 'image', style: 'solid' })} />}
            >
                <Text>test</Text>
            </EstablishmentFormAccordionItem>
        </EstablishmentAccordion>
    );
};

const EstablishmentAccordion = styled(Accordion)`
    row-gap: 1rem;
`;
const ItemIcon = styled(FontAwesomeIcon)`
    width: 1rem;
    height: 1rem;
    color: var(--neutral500);
`;

export default EstablishmentFormAccordion;
