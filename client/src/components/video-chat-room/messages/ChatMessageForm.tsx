import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useRtmContext } from 'store/context/RtmContext';
import { faPaperPlane } from '@fortawesome/pro-regular-svg-icons';

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
            <div className="message__input__wrapper">
                <input
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        setMessage(e.target.value)
                    }
                    value={message}
                    type="text"
                    name="message"
                    placeholder="Send a message...."
                />
                <button className="inline-block px-3 bg-sky-600/80 hover:bg-sky-400/90 text-lg min-h-[3.5rem]">
                    <FontAwesomeIcon icon={faPaperPlane} />
                </button>
            </div>
        </form>
    );
};

export default ChatMessageForm;
