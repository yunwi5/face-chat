import React, { useState } from 'react';
import { useRtmContext } from 'store/context/RtmContext';

const ChatMessageForm = () => {
    const [message, setMessage] = useState('');
    const { addUserMessage } = useRtmContext();

    const handleMessageSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (message.trim() !== '') addUserMessage(message);
        setMessage('');
    };

    return (
        <form id="message__form" onSubmit={handleMessageSubmit}>
            <input
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setMessage(e.target.value)
                }
                value={message}
                type="text"
                name="message"
                placeholder="Send a message...."
            />
        </form>
    );
};

export default ChatMessageForm;
