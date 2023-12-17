import Text from '@components/Text';
import Stack from '@components/Stack';
import styled from 'styled-components';
import Illustration404 from '@public/images/404-illustration.svg?react';
import Link from '@components/Link';
import { FormattedMessage } from 'react-intl';
import { icon } from '@fortawesome/fontawesome-svg-core/import.macro';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const NoRouteFoundPage = () => {
    return (
        <Page>
            <Stack gap="0.5rem" align="center">
                <Text variant="headingXL" fontWeight="--fw-bold">
                    <FormattedMessage defaultMessage="Oups !" />
                </Text>
                <Text variant="headingS">
                    <FormattedMessage defaultMessage="Vous êtes perdu" />
                </Text>
            </Stack>
            <Illustration />
            <HomeLink to="/" replace>
                <ArrowIcon icon={icon({ name: 'arrow-left', style: 'solid' })} />
                <Text variant="bodyL">
                    <FormattedMessage defaultMessage="Retourner au salon de coiffure" />
                </Text>
            </HomeLink>
        </Page>
    );
};

const Page = styled.section`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    row-gap: 4rem;
    padding: var(--container-padding-mobile);

    ${({ theme }) => theme.mediaQueries.desktopAndUp} {
        padding: var(--container-padding);
    }
`;
const Illustration = styled(Illustration404)`
    width: 660px;
`;
const HomeLink = styled(Link)`
    padding-bottom: 0.5rem;
    border-bottom: 1px solid var(--neutral500);
    display: flex;
    align-items: center;
    column-gap: 0.75rem;
`;
const ArrowIcon = styled(FontAwesomeIcon)`
    width: 1.5rem;
    height: 1.5rem;
`;

export default NoRouteFoundPage;
