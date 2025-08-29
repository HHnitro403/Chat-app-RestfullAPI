
import React from 'react';
import type { Message } from '../types';
import { MessageType } from '../types';

interface MessageItemProps {
  message: Message;
  isCurrentUser: boolean;
}

const MediaMessage: React.FC<{ message: Message }> = ({ message }) => {
    switch (message.type) {
        case MessageType.IMAGE:
            return <img src={message.content} alt={message.fileName || 'Uploaded image'} className="max-w-xs max-h-64 rounded-lg mt-2 cursor-pointer" />;
        case MessageType.VIDEO:
            return <video src={message.content} controls className="max-w-xs max-h-64 rounded-lg mt-2" />;
        case MessageType.AUDIO:
            return <audio src={message.content} controls className="mt-2 w-full" />;
        default:
            return null;
    }
}

const MessageItem: React.FC<MessageItemProps> = ({ message, isCurrentUser }) => {
  const alignment = isCurrentUser ? 'justify-end' : 'justify-start';
  const bubbleColor = isCurrentUser ? 'bg-indigo-600' : 'bg-gray-700';
  const authorName = isCurrentUser ? 'You' : message.author.name;

  return (
    <div className={`flex items-start gap-3 ${alignment}`}>
      {!isCurrentUser && (
        <img src={message.author.avatar} alt={message.author.name} className="w-8 h-8 rounded-full" />
      )}
      <div className="flex flex-col" style={{ maxWidth: '70%' }}>
        <div className="flex items-center gap-2">
            <span className="text-sm font-medium">{authorName}</span>
            <span className="text-xs text-gray-400">
                {new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </span>
        </div>
        <div className={`mt-1 p-3 rounded-lg ${bubbleColor} text-white`}>
          {message.type === MessageType.TEXT ? (
            <p className="text-sm break-words">{message.content}</p>
          ) : (
            <div>
              <p className="text-sm font-medium mb-1 italic">{message.fileName || "Media file"}</p>
              <MediaMessage message={message} />
            </div>
          )}
        </div>
      </div>
       {isCurrentUser && (
        <img src={message.author.avatar} alt={message.author.name} className="w-8 h-8 rounded-full" />
      )}
    </div>
  );
};

export default MessageItem;
