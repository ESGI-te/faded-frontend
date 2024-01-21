import SelectEstablishment from '@components/SelectEstablishment';
import PropTypes from 'prop-types';
import Dropdown from 'shared/src/components/Dropdown';
import styled from 'styled-components';

const EstablishmentDropdown = ({ onClose }) => {
    return (
        <EstablishmentDropdownStyled placement="bottom right" offset={8}>
            <SelectEstablishment onClose={onClose} />
        </EstablishmentDropdownStyled>
    );
};

const EstablishmentDropdownStyled = styled(Dropdown)`
    ${({ theme }) => theme.mediaQueries.desktopAndUp} {
        border-radius: var(--r-l);
        max-width: 400px;
    }
`;

EstablishmentDropdown.propTypes = {
    onClose: PropTypes.func.isRequired,
};

EstablishmentDropdown.defaultProps = {
    onClose: () => {},
};

export default EstablishmentDropdown;
