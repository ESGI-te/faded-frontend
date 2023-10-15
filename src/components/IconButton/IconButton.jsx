import PropTypes from 'prop-types';
import Button from '@components/Button';

const IconButton = ({ size, icon, ...props }) => (
    <Button size={`${size}Icon`} startIcon={icon} {...props} />
);

IconButton.propTypes = {
    variant: PropTypes.oneOf(['primary', 'secondary', 'ghost']),
    size: PropTypes.oneOf(['medium', 'small']),
    backgroundColor: PropTypes.string,
    color: PropTypes.string,
    icon: PropTypes.element.isRequired,
    isRound: PropTypes.bool,
    isDisabled: PropTypes.bool,
    isLoading: PropTypes.bool,
    'aria-label': PropTypes.string,
};

IconButton.defaultProps = {
    size: 'medium',
};

export default IconButton;
