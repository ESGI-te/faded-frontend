import PropTypes from 'prop-types';
import Accordion from 'shared/src/components/Accordion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { icon } from '@fortawesome/fontawesome-svg-core/import.macro';
import styled from 'styled-components';
import Text from 'shared/src/components/Text';
import { FormattedMessage } from 'react-intl';
import EstablishmentFormAccordionItem from './EstablishmentFormAccordionItem';

const EstablishmentFormAccordion = () => {
    return (
        <EstablishmentAccordion>
            <EstablishmentFormAccordionItem
                label={<FormattedMessage defaultMessage="Informations" />}
            >
                <Text>test</Text>
            </EstablishmentFormAccordionItem>
            <EstablishmentFormAccordionItem label={<FormattedMessage defaultMessage="Horaires" />}>
                <Text>test</Text>
            </EstablishmentFormAccordionItem>
            <EstablishmentFormAccordionItem label={<FormattedMessage defaultMessage="Services" />}>
                <Text>test</Text>
            </EstablishmentFormAccordionItem>
            <EstablishmentFormAccordionItem label={<FormattedMessage defaultMessage="Équipe" />}>
                <Text>test</Text>
            </EstablishmentFormAccordionItem>
            <EstablishmentFormAccordionItem label={<FormattedMessage defaultMessage="Photos" />}>
                <Text>test</Text>
            </EstablishmentFormAccordionItem>
        </EstablishmentAccordion>
    );
};

const EstablishmentAccordion = styled(Accordion)`
    row-gap: 1rem;
`;

EstablishmentFormAccordion.propTypes = {};

EstablishmentFormAccordion.defaultProps = {};

export default EstablishmentFormAccordion;
