import PropTypes from 'prop-types';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { icon } from '@fortawesome/fontawesome-svg-core/import.macro';

const positionColorLookup = {
    1: '--gold',
    2: '--silver',
    3: '--ochre',
};

const TopServiceMedal = ({ position }) => (
    <MedalWrapper $color={positionColorLookup[position]}>
        <MedalIcon icon={icon({ name: 'medal', style: 'solid' })} />
    </MedalWrapper>
);

const MedalIcon = styled(FontAwesomeIcon)`
    font-size: 0.75rem;
`;
const MedalWrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 2rem;
    height: 2rem;
    border-radius: var(--r-s);
    background-color: ${({ $color }) => `var(${$color}50)`};

    & > ${MedalIcon} {
        color: ${({ $color }) => `var(${$color})`};
    }
`;

TopServiceMedal.propTypes = {
    position: PropTypes.number.isRequired,
};

export default TopServiceMedal;
