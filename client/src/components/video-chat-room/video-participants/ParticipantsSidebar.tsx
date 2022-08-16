import { useRtmContext } from 'store/context/RtmContext';

const ParticipantsSidebar = () => {
    const { participants } = useRtmContext();

    return (
        <section id="members__container">
            <div id="members__header">
                <p>Participants</p>
                <strong id="members__count">{participants.length}</strong>
            </div>

            <div id="member__list">
                {participants.map((part) => (
                    <div
                        key={part.uid}
                        className="member__wrapper"
                        id={`member__${part.uid}__wrapper`}
                    >
                        <span className="green__icon"></span>
                        <p className="member_name">{part.name}</p>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default ParticipantsSidebar;
