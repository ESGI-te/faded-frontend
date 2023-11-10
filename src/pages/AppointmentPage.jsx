import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styled from 'styled-components';
import { icon } from '@fortawesome/fontawesome-svg-core/import.macro';
import Text from '@components/Text';
import { Separator } from 'react-aria-components';
import Appointment from '@components/Appointment';
import { useEstablishment } from '@contexts/EstablishmentAppointmentProvider';

const AppointmentPage = () => {
    const { establishment, isLoading } = useEstablishment();

    if (isLoading) return <Page>Loading...</Page>; // TODO: Add skeleton

    return (
        <Page>
            <PageInnerWrapper>
                <TitleWrapper>
                    <Text as="h1" variant="headingM" fontWeight="--fw-bold">
                        {establishment.name}
                    </Text>
                    <SubtitleWrapper>
                        <Subtitle>
                            <SubtitleIcon icon={icon({ name: 'location-dot', style: 'solid' })} />
                            {establishment.address}
                        </Subtitle>
                        <Divider />
                        <Subtitle>
                            <SubtitleIcon icon={icon({ name: 'star', style: 'regular' })} />
                            <span>{establishment.note}</span>
                            <span>({establishment.noteCount} avis)</span>
                        </Subtitle>
                    </SubtitleWrapper>
                </TitleWrapper>
                <Appointment establishment={establishment} />
            </PageInnerWrapper>
        </Page>
    );
};

const Page = styled.section`
    min-height: 100%;
    width: 100%;
    display: flex;
    align-items: start;
    background-color: var(--neutral50);

    ${({ theme }) => theme.mediaQueries.desktopAndUp} {
        justify-content: center;
    }
`;
const PageInnerWrapper = styled.div`
    width: 100%;
    max-width: var(--container-width);
    display: flex;
    flex-direction: column;
    row-gap: 1rem;
    background-color: var(--neutral50);
    padding: var(--container-padding-mobile);

    ${({ theme }) => theme.mediaQueries.desktopAndUp} {
        row-gap: 2rem;
        padding: var(--container-padding);
    }
`;
const TitleWrapper = styled.div`
    display: flex;
    flex-direction: column;
    row-gap: 0.25rem;
`;
const SubtitleWrapper = styled.div`
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    gap: 0.75rem;
`;
const Subtitle = styled(Text)`
    color: var(--neutral500);
    font-size: var(--fs-body-l);
    display: flex;
    column-gap: 0.25rem;
    align-items: center;
`;
const SubtitleIcon = styled(FontAwesomeIcon)`
    width: 0.875rem;
    height: 0.875rem;
    color: var(--neutral500);
`;
const Divider = styled(Separator)`
    width: 0.375rem;
    height: 0.375rem;
    background-color: var(--neutral300);
    border-radius: var(--r-full);
`;
export default AppointmentPage;
