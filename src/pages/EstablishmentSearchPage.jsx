import { useMemo, useState } from 'react';
import useEstablishmentsSearchQuery from '@queries/establishment/useEstablishmentsSearchQuery.hook';
import { useSearchParams } from 'react-router-dom';
import styled, { css } from 'styled-components';
import EstablishmentResults from '@components/EstablishmentResults';
import SearchEstablishments from '@components/SearchEstablishments';
import Button from '@components/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { icon } from '@fortawesome/fontawesome-svg-core/import.macro';

const EstablishmentSearchPage = () => {
    const [searchParams] = useSearchParams();
    const params = useMemo(() => Object.fromEntries([...searchParams]), [searchParams]);
    const { data: establishments, isLoading } = useEstablishmentsSearchQuery(params, {
        enabled: Object.keys(params).length > 0,
    });
    const [isMapVisible, setIsMapVisible] = useState(false);

    const handleToggleDisplay = () => setIsMapVisible((prev) => !prev);

    return (
        <Page>
            <SearchEstablishmentWrapper isMapVisible={isMapVisible}>
                <SearchEstablishments />
                <ButtonsWrapper>
                    <SearchEstablishmentButton
                        size="small"
                        variant="secondary"
                        startIcon={
                            isMapVisible ? (
                                <Icon
                                    icon={icon({
                                        name: 'list',
                                        style: 'solid',
                                    })}
                                />
                            ) : (
                                <Icon
                                    icon={icon({
                                        name: 'location-dot',
                                        style: 'solid',
                                    })}
                                />
                            )
                        }
                        onPress={handleToggleDisplay}
                    >
                        {isMapVisible ? 'Liste' : 'Carte'}
                    </SearchEstablishmentButton>
                    <SearchEstablishmentButton
                        size="small"
                        variant="secondary"
                        startIcon={<Icon icon={icon({ name: 'sort', style: 'solid' })} />}
                    >
                        Filtres
                    </SearchEstablishmentButton>
                </ButtonsWrapper>
            </SearchEstablishmentWrapper>
            <EstablishmentResultsWrapper>
                <EstablishmentResults
                    establishments={establishments}
                    isLoading={isLoading}
                    isMapVisible={isMapVisible}
                />
            </EstablishmentResultsWrapper>
        </Page>
    );
};

const Page = styled.section`
    align-self: stretch;
    display: flex;
    flex-direction: column;
    align-items: start;
    width: 100%;

    ${({ theme }) => theme.mediaQueries.mobile} {
        position: relative;
    }
`;
const SearchEstablishmentWrapper = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    row-gap: 1rem;
    background-color: var(--primary300);
    padding: var(--container-padding-mobile);

    ${({ theme }) => theme.mediaQueries.mobile} {
        ${({ isMapVisible }) =>
            isMapVisible &&
            css`
                background: transparent;
                position: absolute;
                top: 0;
                z-index: 1;
            `}
    }

    ${({ theme }) => theme.mediaQueries.desktopAndUp} {
        padding: var(--container-padding);
    }
`;
const EstablishmentResultsWrapper = styled.div`
    width: 100%;
    height: 100%;
    overflow: hidden;
`;
const Icon = styled(FontAwesomeIcon)`
    width: 1rem;
    height: 1rem;
    color: var(--neutral500);
`;
const ButtonsWrapper = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    flex-direction: row;
    column-gap: 1rem;

    & > button {
        flex: 1;
    }

    ${({ theme }) => theme.mediaQueries.desktopAndUp} {
        display: none;
    }
`;
const SearchEstablishmentButton = styled(Button)`
    background-color: var(--white);
    color: var(--black);
`;

EstablishmentSearchPage.propTypes = {};

export default EstablishmentSearchPage;
