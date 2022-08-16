export const BOT_UID = 'FaceChat Bot';

export interface IMember {
    uid: string;
    name: string;
}

export enum MessageType {
    BOT = 'bot',
    USER = 'user',
}

export interface IChatMessage {
    type: MessageType;
    text: string;
    uid: string;
    name?: string;
    dateTime: string | Date;
}

// will have some useful methods like calculating the time diff between message dateTime and current dateTime.
export class ChatMessage implements IChatMessage {
    uid: string;
    type: MessageType;
    text: string;
    name?: string;
    dateTime: Date;

    constructor(message: IChatMessage) {
        this.uid = message.uid;
        this.type = message.type;
        this.text = message.text;
        this.name = message.name;
        this.dateTime = new Date(message.dateTime);
    }
}
