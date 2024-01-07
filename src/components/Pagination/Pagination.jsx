import IconButton from '@components/IconButton';
import styled, { css } from 'styled-components';
import { icon } from '@fortawesome/fontawesome-svg-core/import.macro';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Button from '@components/Button';
import Text from '@components/Text';
import { FormattedMessage } from 'react-intl';
import { createSearchParams, useSearchParams } from 'react-router-dom';

const Pagination = ({ pagination, onPageChange, pagesRange = 1 }) => {
    const { first, current, last, previous, next, totalItems, perPage } = pagination;
    let [searchParams, setSearchParams] = useSearchParams();

    const handlePageChange = (page) => {
        setSearchParams(
            createSearchParams({
                ...Object.fromEntries(searchParams),
                page,
            }),
        );
        onPageChange && onPageChange(page);
    };

    const renderPageNumbers = () => {
        const pageNumbers = [];
        if (last <= pagesRange) {
            // Si le nombre total de pages est inférieur ou égal à la valeur spécifiée dans pagesRange,
            // affiche simplement toutes les pages.
            for (let i = first; i <= last; i++) {
                pageNumbers.push(
                    <PageButtonWrapper key={i}>
                        <PageButton
                            $isCurrent={i === current}
                            variant="ghost"
                            onPress={() => handlePageChange(i)}
                        >
                            {i}
                        </PageButton>
                    </PageButtonWrapper>,
                );
            }
        } else {
            // Sinon, affiche les pages jusqu'à la valeur spécifiée dans pagesRange,
            // puis ajoute un point de suspension avant la dernière page.
            const endPage = Math.min(current + Math.floor(pagesRange / 2), last);
            for (let i = first; i <= endPage; i++) {
                pageNumbers.push(
                    <PageButtonWrapper key={i}>
                        <PageButton
                            $isCurrent={i === current}
                            variant="ghost"
                            onPress={() => handlePageChange(i)}
                        >
                            {i}
                        </PageButton>
                    </PageButtonWrapper>,
                );
            }

            if (endPage < last) {
                pageNumbers.push(
                    <PageButtonWrapper key="ellipsis">
                        <Ellipsis>...</Ellipsis>
                    </PageButtonWrapper>,
                );
                pageNumbers.push(
                    <PageButtonWrapper key={last}>
                        <PageButton
                            $isCurrent={last === current}
                            variant="ghost"
                            onPress={() => handlePageChange(last)}
                        >
                            {last}
                        </PageButton>
                    </PageButtonWrapper>,
                );
            }
        }

        return pageNumbers;
    };

    return (
        <ResponsiveWrapper>
            <PageButtons className="pagination">
                {previous && (
                    <PageButtonWrapper>
                        <PageControlButton
                            onPress={() => handlePageChange(previous)}
                            variant="ghost"
                            icon={<Icon icon={icon({ name: 'chevron-left', style: 'solid' })} />}
                        />
                    </PageButtonWrapper>
                )}

                {renderPageNumbers()}

                {next && (
                    <PageButtonWrapper>
                        <PageControlButton
                            onPress={() => handlePageChange(next)}
                            variant="ghost"
                            icon={<Icon icon={icon({ name: 'chevron-right', style: 'solid' })} />}
                        />
                    </PageButtonWrapper>
                )}
            </PageButtons>

            <Text>
                <FormattedMessage
                    defaultMessage="Total des éléments : {totalItems}, Éléments par page : {perPage}"
                    values={{
                        totalItems,
                        perPage,
                    }}
                />
            </Text>
        </ResponsiveWrapper>
    );
};

const PageButtons = styled.ul`
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: var(--white);
    border-radius: var(--r-m);
    box-shadow: var(--shadow-xs);
    overflow: hidden;
`;
const ResponsiveWrapper = styled.div`
    display: flex;
    flex-direction: column;
    row-gap: 0.5rem;

    ${({ theme }) => theme.mediaQueries.desktopAndUp} {
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
    }
`;
const Icon = styled(FontAwesomeIcon)`
    width: 0.75rem;
    height: 0.75rem;
    color: var(--neutral500);
`;
const PageControlButton = styled(IconButton)`
    padding: 0;
    width: 100%;
    height: 100%;
    color: var(--neutral500);
    font-size: var(--fw-body-m);
    padding: 0.25rem 1rem;
    border-radius: 0;

    &[data-hovered] {
        background-color: var(--neutral50);
    }
`;
const PageButton = styled(Button)`
    padding: 0;
    width: 100%;
    height: 100%;
    color: var(--neutral500);
    font-size: var(--fw-body-m);
    padding: 0.25rem 1rem;
    border-radius: 0;

    &[data-focused] {
        outline: none;
    }

    ${({ $isCurrent }) =>
        $isCurrent &&
        css`
            background-color: var(--black);
            color: var(--white);
        `}

    ${({ $isCurrent }) =>
        !$isCurrent &&
        css`
            &[data-hovered] {
                background-color: var(--neutral50);
            }
        `}
`;
const Ellipsis = styled.span`
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--neutral500);
    font-size: var(--fw-body-m);
`;
const PageButtonWrapper = styled.li`
    align-self: stretch;
    width: 3rem;

    &:not(:last-child) {
        border-right: 1px solid var(--neutral100);
    }
`;

export default Pagination;
