import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import { useState } from 'react';
import EstablishmentFeedbackNote from './EstablishmentFeedbackNote';
import EstablishmentFeedbackList from './EstablishmentFeedbackList';
import { Button } from 'react-aria-components';

const TABS = {
    GLOBAL: 'global',
    DETAILS: 'details',
};

const EstablishmentFeedback = ({ feedback, note, noteCount }) => {
    const [activeTab, setActiveTab] = useState(TABS.GLOBAL);

    return (
        <Wrapper>
            <Tabs activeTab={activeTab}>
                <Tab onClick={() => setActiveTab(TABS.GLOBAL)}>Note globale</Tab>
                <Tab onClick={() => setActiveTab(TABS.DETAILS)}>Avis</Tab>
            </Tabs>
            <TabWrapper>
                {activeTab === TABS.GLOBAL && (
                    <EstablishmentFeedbackNote note={note} noteCount={noteCount} />
                )}
                {activeTab === TABS.DETAILS && <EstablishmentFeedbackList feedback={feedback} />}
            </TabWrapper>
        </Wrapper>
    );
};

const Wrapper = styled.div`
    width: 100%;
    background-color: var(--white);
    border-radius: var(--r-s);
    display: flex;
    flex-direction: column;
    row-gap: 1rem;
`;
const Tabs = styled.div`
    display: flex;
    border-bottom: 2px solid var(--neutral100);
    position: relative;

    &::after {
        content: '';
        position: absolute;
        left: 0;
        bottom: -2px;
        width: 50%;
        height: 2px;
        background-color: var(--black);
        transition: 0.25s;

        ${({ activeTab }) =>
            activeTab === TABS.DETAILS &&
            css`
                transform: translateX(100%);
            `}
    }
`;
const Tab = styled(Button)`
    flex: 1;
    color: var(--black);
    padding: 1rem;
    font-size: var(--fs-body);
    font-weight: var(--fw-semibold);
    background: none;
    border: none;
    cursor: pointer;

    &[data-focused] {
        outline: none;
    }

    /* ${({ isActive }) =>
        isActive &&
        css`
            border-bottom: 2px solid var(--black);
        `}; */
`;
const TabWrapper = styled.div`
    width: 100%;
    padding-inline: 1rem;
    padding-bottom: 1rem;
`;

EstablishmentFeedback.propTypes = {
    feedback: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.number.isRequired,
            note: PropTypes.number.isRequired,
            comment: PropTypes.string.isRequired,
            dateTime: PropTypes.string.isRequired,
            barber: PropTypes.object.isRequired,
            service: PropTypes.object.isRequired,
        }),
    ).isRequired,
    note: PropTypes.number.isRequired,
    noteCount: PropTypes.number.isRequired,
};

export default EstablishmentFeedback;
