import Text from '@components/Text';
import styled from 'styled-components';

const DefaultLayoutNav = () => {
    return (
        <nav>
            <NavList>
                <li>
                    <Text variant="headingS" fontWeight="--fw-semibold" color="--white">
                        Link 1
                    </Text>
                </li>
                <li>
                    <Text variant="headingS" fontWeight="--fw-semibold" color="--white">
                        Link 2
                    </Text>
                </li>
                <li>
                    <Text variant="headingS" fontWeight="--fw-semibold" color="--white">
                        Link 3
                    </Text>
                </li>
                <li>
                    <Text variant="headingS" fontWeight="--fw-semibold" color="--white">
                        Link 4
                    </Text>
                </li>
            </NavList>
        </nav>
    );
};

const NavList = styled.nav`
    display: flex;
    flex-direction: column;
    row-gap: 1rem;
`;

export default DefaultLayoutNav;
