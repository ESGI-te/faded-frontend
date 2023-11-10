import PropTypes from 'prop-types';
import styled from 'styled-components';
import Text from '@components/Text';

const EstablishmentBarbers = ({ barbers }) => {
    return (
        <Wrapper>
            {barbers.map((barber) => (
                <Barber key={barber.id}>
                    <BarberImage>
                        <Text color="--white" variant="bodyL" fontWeight="--fw-bold">
                            {barber.firstName[0]}
                        </Text>
                    </BarberImage>
                    <Text variant="bodyL">{barber.firstName}</Text>
                </Barber>
            ))}
        </Wrapper>
    );
};

const Wrapper = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;
    width: 100%;
    padding: 1.5rem;
    border-radius: var(--r-s);
    background-color: var(--white);
`;
const Barber = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    row-gap: 0.5rem;
`;
const BarberImage = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 4rem;
    height: 4rem;
    border-radius: var(--r-full);
    background-color: var(--black);
`;

EstablishmentBarbers.propTypes = {
    barbers: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.number.isRequired,
            firstName: PropTypes.string.isRequired,
            lastName: PropTypes.string.isRequired,
        }),
    ).isRequired,
};

export default EstablishmentBarbers;
