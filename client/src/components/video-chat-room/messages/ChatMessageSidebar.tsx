import { MessageType } from 'models/rtm-models';
import { useRtmContext } from 'store/context/RtmContext';
import ChatMessageForm from './ChatMessageForm';

const ChatMessageSidebar: React.FC = () => {
    const { messages } = useRtmContext();

    return (
        <section id="messages__container">
            <div id="messages">
                {messages.map((message, idx) => {
                    const isBot = message.type === MessageType.BOT;
                    return (
                        <div key={idx} className="message__wrapper">
                            <div
                                className={`${isBot ? 'message__body__bot' : 'message__body'}`}
                            >
                                <strong
                                    className={`${
                                        isBot ? 'message__author__bot' : 'message__author'
                                    }`}
                                >
                                    {isBot ? '🤖 Mumble Bot' : message.name || 'Unknown'}
                                </strong>
                                <p
                                    className={`${
                                        isBot ? 'message__text__bot' : 'message__text'
                                    } `}
                                >
                                    {message.text}
                                </p>
                            </div>
                        </div>
                    );
                })}
            </div>

            <ChatMessageForm />
        </section>
    );
};

export default ChatMessageSidebar;
