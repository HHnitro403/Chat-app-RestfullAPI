
export interface User {
  id: string;
  name: string;
  avatar: string;
}

export enum MessageType {
  TEXT = 'TEXT',
  IMAGE = 'IMAGE',
  VIDEO = 'VIDEO',
  AUDIO = 'AUDIO',
}

export interface Message {
  id: string;
  author: User;
  type: MessageType;
  content: string; // For TEXT, this is the message. For others, it's a data URL.
  timestamp: string;
  fileName?: string; // For file-based messages
}

export enum View {
    CHAT = 'CHAT',
    API_DOCS = 'API_DOCS'
}
