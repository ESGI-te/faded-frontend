import styled from 'styled-components';
import { shimmering } from 'shared/src/styles/animations';

const ServicesSkeleton = () => {
    return (
        <Wrapper>
            <Block height="77px" />
            <List>
                <Block height="3rem" />
                <Block height="3rem" />
                <Block height="3rem" />
                <Block height="3rem" />
                <Block height="3rem" />
                <Block height="3rem" />
            </List>
        </Wrapper>
    );
};

const Block = styled.div`
    background-color: var(--neutral100);
    border-radius: var(--r-s);
    width: 100%;
    padding: 1rem;
    min-height: 0;
    flex-grow: 1;
    overflow: hidden;
    ${({ height }) => height && `height: ${height};`}
    ${({ width }) => width && `max-width: ${width};`}
    ${({ color }) => color && `background-color: var(${color});`}
    
    ${shimmering}
`;
const List = styled.div`
    display: flex;
    flex-direction: column;
    row-gap: 0.75rem;
    flex-grow: 1;
    min-height: 0;
    overflow: hidden;
`;
const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    row-gap: 1.5rem;
    min-height: 0;
`;

export default ServicesSkeleton;
