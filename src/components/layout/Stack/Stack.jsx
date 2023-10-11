import styled from 'styled-components';
import PropTypes from 'prop-types';

/**
 * Stack is a layout component that makes it easy to stack elements together and apply a space between them.
 *
 * Example:
 * <Stack>
 *     <h2>Some text</h2>
 *     <img src="path/to/some/image.svg" />
 *     <p>More text</p>
 * </Stack>
 *
 * References:
 * https://every-layout.dev/layouts/stack/
 * https://chakra-ui.com/docs/layout/stack
 * https://seek-oss.github.io/braid-design-system/components/Stack
 */
const Stack = styled.div`
    display: flex;
    flex-direction: column;
    gap: ${(props) => props.$gap};
    align-items: ${(props) => props.$alignItems ?? props.$align};
    justify-content: ${(props) => props.$justifyContent ?? props.$justify};
`;

Stack.propTypes = {
    /**
     * The spacing between children.
     * A `margin` CSS value.
     */
    gap: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    /**
     * An `align-items` CSS value.
     */
    alignItems: PropTypes.string,
    align: PropTypes.string, // Shortcut for alignItems
    /**
     * A `justify-content` CSS value.
     */
    justifyContent: PropTypes.string,
    justify: PropTypes.string, // Shortcut for justifyContent
};

export default Stack;
