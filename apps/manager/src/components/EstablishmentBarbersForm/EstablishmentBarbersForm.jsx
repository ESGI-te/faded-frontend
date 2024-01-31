import PropTypes from 'prop-types';
import Text from 'shared/src/components/Text';
import styled from 'styled-components';
import { FormattedMessage } from 'react-intl';
import AvailableBarbers from './AvailableBarbers';
import SelectedBarbers from './SelectedBarbers';
import useUserQuery from 'shared/src/queries/user/useUserQuery.hook';
import { USER_ROLES } from 'shared/src/utils/constants';

const EstablishmentBarbersForm = (props) => {
    const { data: user } = useUserQuery();
    const isProvider = user?.roles?.includes(USER_ROLES.PROVIDER);

    return (
        <Wrapper>
            <SelectedBarbersWrapper>
                <Text variant="headingS" fontWeight="--fw-semibold">
                    <FormattedMessage defaultMessage="Votre équipe" />
                </Text>
                <SelectedBarbers />
            </SelectedBarbersWrapper>
            {isProvider && (
                <AvailableBarbersWrapper>
                    <Text variant="headingS" fontWeight="--fw-semibold">
                        <FormattedMessage defaultMessage="Équipe disponible" />
                    </Text>
                    <AvailableBarbers />
                </AvailableBarbersWrapper>
            )}
        </Wrapper>
    );
};

const Wrapper = styled.div`
    display: flex;
    column-gap: 1rem;
    background-color: var(--white);
    border-radius: var(--r-l);
    padding: 1rem;
    height: 500px;
`;
const SelectedBarbersWrapper = styled.div`
    display: flex;
    flex-direction: column;
    flex: 1;
    min-height: 0;
    padding-inline: 2rem;
    padding-block: 2rem 0;
`;
const AvailableBarbersWrapper = styled.div`
    display: flex;
    flex-direction: column;
    background-color: var(--neutral50);
    border-radius: var(--r-l);
    padding: 2rem;
    flex: 1;
    min-height: 0;
`;

EstablishmentBarbersForm.propTypes = {};

export default EstablishmentBarbersForm;
