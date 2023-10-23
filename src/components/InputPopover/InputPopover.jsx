import styled from 'styled-components';

const InputPopover = styled.div`
    position: absolute;
    z-index: 10;
    top: calc(100% + 0.5rem);
    max-height: 10rem;
    width: 100%;
    overflow-y: scroll;
    background-color: var(--white);
    border-radius: var(--r-s);
    padding: 0.5rem;
    border: 1px solid var(--neutral500);
`;

export default InputPopover;
