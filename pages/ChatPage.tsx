
import React, { useState, useEffect, useRef } from 'react';
import type { User, Message } from '../types';
import { MessageType } from '../types';
import MessageItem from '../components/MessageItem';
import MessageInput from '../components/MessageInput';
import { generateSmartReplies } from '../services/geminiService';

interface ChatPageProps {
  user: User;
}

const initialMessages: Message[] = [
    {
        id: 'msg-1',
        author: { id: 'user-2', name: 'Alice', avatar: 'https://i.pravatar.cc/150?u=alice' },
        type: MessageType.TEXT,
        content: 'Hey! Are we still on for the project meeting tomorrow?',
        timestamp: new Date(Date.now() - 1000 * 60 * 5).toISOString(),
    },
    {
        id: 'msg-2',
        author: { id: 'user-3', name: 'Bob', avatar: 'https://i.pravatar.cc/150?u=bob' },
        type: MessageType.TEXT,
        content: "Yep, I'll be there. I've finished the slides.",
        timestamp: new Date(Date.now() - 1000 * 60 * 4).toISOString(),
    },
];

const ChatPage: React.FC<ChatPageProps> = ({ user }) => {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [smartReplies, setSmartReplies] = useState<string[]>([]);
  const [isLoadingReplies, setIsLoadingReplies] = useState<boolean>(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
    const fetchReplies = async () => {
      if (messages.length > 0) {
        setIsLoadingReplies(true);
        const replies = await generateSmartReplies(messages);
        setSmartReplies(replies);
        setIsLoadingReplies(false);
      }
    };
    fetchReplies();
  }, [messages]);

  const addMessage = (content: string, type: MessageType, fileName?: string) => {
    const newMessage: Message = {
      id: `msg-${Date.now()}`,
      author: user,
      type,
      content,
      timestamp: new Date().toISOString(),
      fileName,
    };
    setMessages(prev => [...prev, newMessage]);
  };

  return (
    <div className="flex h-full">
      <aside className="w-64 bg-gray-800/80 flex-shrink-0 p-4 hidden md:flex flex-col">
        <h2 className="text-lg font-semibold mb-4">Channels</h2>
        <ul>
          <li className="p-2 rounded-md bg-indigo-500/50 cursor-pointer"># general</li>
          <li className="p-2 rounded-md hover:bg-gray-700 cursor-pointer"># project-x</li>
          <li className="p-2 rounded-md hover:bg-gray-700 cursor-pointer"># random</li>
        </ul>
      </aside>
      <div className="flex-1 flex flex-col bg-gray-900/90">
        <div className="flex-1 p-6 overflow-y-auto">
          <div className="space-y-6">
            {messages.map((msg) => (
              <MessageItem key={msg.id} message={msg} isCurrentUser={msg.author.id === user.id} />
            ))}
          </div>
          <div ref={messagesEndRef} />
        </div>
        <MessageInput
          onSendMessage={addMessage}
          smartReplies={smartReplies}
          isLoadingReplies={isLoadingReplies}
        />
      </div>
    </div>
  );
};

export default ChatPage;
