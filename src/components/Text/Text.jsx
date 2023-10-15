import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import { Link } from 'react-router-dom';

const Text = ({ variant, ...props }) => {
    return (
        <TextBase
            {...props}
            fontSize={variantLookup[variant]?.fontSize || 'initial'}
            lineHeight={variantLookup[variant]?.lineHeight || 'initial'}
        />
    );
};

const truncatedOnSingleLineCss = css`
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
`;

const truncatedOnMultipleLinesCss = css`
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: ${(props) => props.$numberOfLines};
`;

const TextBase = styled.p`
    color: var(${(props) => props.color});
    font-size: ${(props) => props.fontSize};
    font-weight: var(${(props) => props.fontWeight});
    line-height: ${(props) => props.lineHeight};
    text-align: ${(props) => props.textAlign};
    font-style: ${(props) => props.fontStyle};
    word-break: ${(props) => props.wordBreak};
    overflow-wrap: ${(props) => props.overflowWrap};
    text-overflow: ${(props) => props.textOverflow};
    text-transform: ${(props) => props.textTransform};
    white-space: ${(props) => props.whiteSpace};

    ${(p) =>
        ['a', Link].includes(p.as) &&
        `
        text-decoration: none;

        &:hover {
            text-decoration: underline;
        }
    `};

    ${(props) => {
        if (typeof props.$numberOfLines !== 'number') {
            return null;
        }

        switch (props.$numberOfLines) {
            case 0:
            case 1:
                return truncatedOnSingleLineCss;
            default:
                return truncatedOnMultipleLinesCss;
        }
    }}
`;

const variantLookup = {
    headingXL: {
        fontSize: 'var(--fs-heading-xl)',
        lineHeight: 'var(--lh-heading-xl)',
    },
    headingL: {
        fontSize: 'var(--fs-heading-l)',
        lineHeight: 'var(--lh-heading-l)',
    },
    headingM: {
        fontSize: 'var(--fs-heading-m)',
        lineHeight: 'var(--lh-heading-m)',
    },
    headingS: {
        fontSize: 'var(--fs-heading-s)',
        lineHeight: 'var(--lh-heading-s)',
    },
    bodyL: {
        fontSize: 'var(--fs-body-l)',
        lineHeight: 'var(--lh-body-l)',
    },
    bodyM: {
        fontSize: 'var(--fs-body-m)',
        lineHeight: 'var(--lh-body-m)',
    },
    bodyS: {
        fontSize: 'var(--fs-body-s)',
        lineHeight: 'var(--lh-body-s)',
    },
};

Text.propTypes = {
    variant: PropTypes.oneOf([
        'headingXL',
        'headingL',
        'headingM',
        'headingS',
        'bodyL',
        'bodyM',
        'bodyS',
    ]),
    fontWeight: PropTypes.oneOf(['--fw-normal', '--fw-semibold', '--fw-bold']),
    textAlign: PropTypes.string,
    wordBreak: PropTypes.string,
    overflowWrap: PropTypes.string,
    textTransform: PropTypes.string,
    color: PropTypes.string,
    numberOfLines: PropTypes.number,
};

Text.defaultProps = {
    variant: 'bodyM',
    fontWeight: '--fw-normal',
};

export default Text;
