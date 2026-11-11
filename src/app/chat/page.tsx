'use client';

import React, { useState } from 'react';
import { useChat } from '@ai-sdk/react';
import { Input } from '@/components/ui/input';

const ChatPage = () => {
  const { messages, sendMessage, status } = useChat();
  const [input, setInput] = useState<string>('');

  return (
    <div className="max-w-4xl mx-auto border p-4 relative h-screen">
      {messages.map((message) => (
        <div key={message.id}>
          <strong>{message.role === 'user' ? 'User: ' : 'Haru: '}</strong>
          {message.parts.map(
            (part, i) =>
              part.type === 'text' && (
                <span key={`${message.id}-${i}`}>{part.text}</span>
              ),
          )}
        </div>
      ))}

      <form
        onSubmit={async (e) => {
          e.preventDefault();

          if (!input.trim()) return;

          try {
            await sendMessage({ text: input });
            setInput('');
          } catch (error) {
            console.error('sendMessage error', error);
          }
        }}
      >
        <Input
          className="fixed bottom-10 mx-auto w-100 rounded-sm"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
      </form>
    </div>
  );
};

export default ChatPage;
