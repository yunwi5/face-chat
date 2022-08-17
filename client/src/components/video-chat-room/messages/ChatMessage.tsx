import { IChatMessage, MessageType } from 'models/rtm-models';
import React from 'react';
import { useRtmContext } from 'store/context/RtmContext';
import { getDateTimeDiffFormat } from 'utils/datetime/date-format';

interface Props {
    message: IChatMessage;
}

const ChatMessage: React.FC<Props> = ({ message }) => {
    const { uid } = useRtmContext();

    const messageTime = new Date(message.dateTime);
    const dateTimeFormat = getDateTimeDiffFormat(messageTime, new Date());

    const isBot = message.type === MessageType.BOT;
    const isSelfMessage = message.uid === uid;
    const meesageClass = isBot
        ? 'message__bot'
        : isSelfMessage
        ? 'message__self'
        : 'message__user';
    const author = isBot ? '🤖 Mumble Bot' : message.name || 'Unknown';

    return (
        <div className={`message__wrapper ${meesageClass}`}>
            <div className={`message__body`}>
                <strong className={`message__header`}>
                    <span className={`message__author`}>{author}</span>{' '}
                    <span className={'message__datetime'}>{dateTimeFormat}</span>
                </strong>
                <p className={`message__text`}>{message.text}</p>
            </div>
        </div>
    );
};

export default ChatMessage;
