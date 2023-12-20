import { Outlet } from 'react-router-dom';
import styled from 'styled-components';
import { icon } from '@fortawesome/fontawesome-svg-core/import.macro';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import IconButton from '@components/IconButton';
import { useState } from 'react';
import ErrorBoundary from '@components/ErrorBoundary';
import ProDrawer from '@components/ProDrawer';

const Header = ({ onToggleDrawer }) => {
    return (
        <HeaderStyled>
            <DrawerButton
                variant="ghost"
                icon={<DrawerIcon icon={icon({ name: 'table-columns', style: 'solid' })} />}
                onPress={onToggleDrawer}
            />
        </HeaderStyled>
    );
};

const ProLayout = () => {
    const [isDrawerOpen, setIsDrawerOpen] = useState();

    const handleToggleDrawer = () =>
        setIsDrawerOpen((isOpen) => {
            if (isOpen === undefined) {
                return true;
            }
            return !isOpen;
        });

    return (
        <Container>
            <ProDrawer isOpen={isDrawerOpen} onToggleDrawer={handleToggleDrawer} />
            <InnerWrapper>
                <Header onToggleDrawer={handleToggleDrawer} />
                <Main>
                    <ErrorBoundary>
                        <Outlet />
                    </ErrorBoundary>
                </Main>
            </InnerWrapper>
        </Container>
    );
};

const Container = styled.div`
    display: flex;
    height: 100%;
`;
const InnerWrapper = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
`;
const HeaderStyled = styled.header`
    height: 70px;
    display: flex;
    align-items: center;
    padding-inline: var(--container-padding-mobile);

    ${({ theme }) => theme.mediaQueries.desktopAndUp} {
        padding-inline: var(--container-padding);
        border-bottom: 1px solid var(--neutral100);
    }
`;
const Main = styled.main`
    flex: 1;
    min-height: 0;
    overflow-y: auto;
    background-color: var(--white);
    display: flex;
    align-items: start;

    & > * {
        flex: 1;
    }
`;
const DrawerIcon = styled(FontAwesomeIcon)`
    width: 1.25rem;
    height: 1.25rem;
    color: var(--black);
`;
const DrawerButton = styled(IconButton)`
    padding: 0;
`;

ProLayout.propTypes = {};

export default ProLayout;
