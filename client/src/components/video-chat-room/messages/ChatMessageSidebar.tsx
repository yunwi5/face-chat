import { useEffect, useRef } from 'react';
import { useRtmContext } from 'store/context/RtmContext';
import ChatMessage from './ChatMessage';
import ChatMessageForm from './ChatMessageForm';

const ChatMessageSidebar: React.FC = () => {
    const { messages } = useRtmContext();
    const messageContainerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (messageContainerRef.current == null) return;
        const lastMessage = messageContainerRef.current.querySelector(':scope > *:last-child');
        lastMessage?.scrollIntoView();
    }, [messages]);

    return (
        <section id="messages__container">
            <div id="messages" ref={messageContainerRef}>
                {messages.map((message, idx) => (
                    <ChatMessage key={idx} message={message} />
                ))}
            </div>

            <ChatMessageForm />
        </section>
    );
};

export default ChatMessageSidebar;
