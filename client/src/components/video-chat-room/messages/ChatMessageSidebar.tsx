import React from 'react';

const ChatMessageSidebar = () => {
    return (
        <section id="messages__container">
            <div id="messages"></div>

            <form id="message__form">
                <input type="text" name="message" placeholder="Send a message...." />
            </form>
        </section>
    );
};

export default ChatMessageSidebar;
