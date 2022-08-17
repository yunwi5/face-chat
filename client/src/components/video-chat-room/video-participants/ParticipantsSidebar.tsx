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
                        className="member__card"
                        id={`member__${part.uid}__wrapper`}
                    >
                        <span className="green__icon"></span>
                        <p className="member_name">{part.name}</p>

                        {/* Button to trigger profile modal for the user. */}
                        <button
                            className={
                                'member__profile-btn absolute right-3 top-[50%] translate-y-5 transition-all opacity-0 px-3 py-2 rounded-sm bg-gray-800 hover:bg-slate-700 hover:text-yellow-200 hover:shadow-md shadow-yellow-300'
                            }
                        >
                            Profile
                        </button>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default ParticipantsSidebar;
