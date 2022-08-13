import React from 'react';

const ParticipantsSidebar = () => {
    return (
        <section id="members__container">
            <div id="members__header">
                <p>Participants</p>
                <strong id="members__count">0</strong>
            </div>

            <div id="member__list"></div>
        </section>
    );
};

export default ParticipantsSidebar;
