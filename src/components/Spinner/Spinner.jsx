import styled from 'styled-components';
import PropTypes from 'prop-types';

const Spinner = (props) => {
    return <SpinnerStyled {...props} />;
};

const SpinnerStyled = styled.div`
    width: ${({ size }) => size};
    height: ${({ size }) => size};
    border: ${({ size }) => `calc(${size} / 8)`} solid var(${({ color }) => color || '--white'});
    border-bottom-color: transparent;
    border-radius: 50%;
    display: inline-block;
    animation: rotation 1s linear infinite;

    @keyframes rotation {
        0% {
            transform: rotate(0deg);
        }
        100% {
            transform: rotate(360deg);
        }
    }
`;

Spinner.propTypes = {
    color: PropTypes.string,
    size: PropTypes.string,
};

Spinner.defaultProps = {
    color: 'var(--white)',
    size: '1rem',
};

export default Spinner;
