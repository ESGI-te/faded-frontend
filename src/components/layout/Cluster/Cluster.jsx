import styled from 'styled-components';
import PropTypes from 'prop-types';

/**
 * Cluster is a layout component that adds a defined space between its children.
 * It wraps its children automatically if there isn't enough space to fit any more in the same row.
 *
 * Example:
 * <Cluster>
 *     <h2>Some text</h2>
 *     <img src="path/to/some/image.svg" />
 *     <p>More text</p>
 * </Cluster>
 *
 * References:
 * https://every-layout.dev/layouts/cluster/
 * https://chakra-ui.com/docs/layout/wrap
 * https://seek-oss.github.io/braid-design-system/components/Inline
 */
const Cluster = styled.div`
    display: flex;
    flex-direction: row;
    gap: ${(props) => props.gap};
    row-gap: ${(props) => props.rowGap};
    column-gap: ${(props) => props.columnGap};
    align-items: ${(props) => props.alignItems ?? props.align};
    justify-content: ${(props) => props.justifyContent ?? props.justify};
    flex-wrap: ${(props) => props.flexWrap ?? props.wrap};
`;

Cluster.propTypes = {
    /**
     * The spacing between children.
     * A `margin` CSS value.
     */
    $gap: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    $rowGap: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    $columnGap: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    /**
     * An `align-items` CSS value.
     */
    $alignItems: PropTypes.string,
    $align: PropTypes.string, // Shortcut for alignItems
    /**
     * A `justify-content` CSS value.
     */
    $justifyContent: PropTypes.string,
    $justify: PropTypes.string, // Shortcut for justifyContent
    /**
     * A `flex-wrap` CSS value.
     */
    $flexWrap: PropTypes.string,
    $wrap: PropTypes.string, // Shortcut for flexWrap
};

Cluster.defaultProps = {
    align: 'flex-start',
    wrap: 'wrap',
};

export default Cluster;
