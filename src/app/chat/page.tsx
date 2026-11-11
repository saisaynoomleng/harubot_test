'use client';

import React, { useState } from 'react';
import { useChat } from '@ai-sdk/react';
import { Input } from '@/components/ui/input';
import {
  Conversation,
  ConversationContent,
  ConversationEmptyState,
} from '@/components/ai-elements/conversation';
import {
  Message,
  MessageContent,
  MessageResponse,
} from '@/components/ai-elements/message';
import {
  PromptInput,
  PromptInputSubmit,
  PromptInputTextarea,
} from '@/components/ai-elements/prompt-input';
import { LoadingSpinner } from '@/components/LoadingSpinner';

const ChatPage = () => {
  const { messages, sendMessage, status } = useChat();
  const [input, setInput] = useState<string>('');

  const isLoading = status === 'streaming' || status === 'submitted';

  return (
    <div className="max-w-4xl mx-auto flex flex-col min-h-screen">
      <Conversation>
        <ConversationContent>
          {messages.length === 0 ? (
            <ConversationEmptyState
              title="Want to learn english from Haru?"
              description="Type a topic to continue"
              className="self-center"
            />
          ) : (
            messages.map((message) => (
              <Message key={message.id} from={message.role}>
                <MessageContent>
                  {message.role === 'assistant' ? (
                    <>
                      {isLoading && (
                        <div className="flex gap-x-2 items-center">
                          <p className="shimmer">Haru is thinking</p>
                          <LoadingSpinner />
                        </div>
                      )}
                      <MessageResponse>
                        {message.parts
                          .filter((part) => part.type === 'text')
                          .map((part) => part.text)
                          .join('')}
                      </MessageResponse>
                    </>
                  ) : (
                    message.parts.map(
                      (part) => part.type === 'text' && part.text,
                    )
                  )}
                </MessageContent>
              </Message>
            ))
          )}
        </ConversationContent>
      </Conversation>

      <div className="p-4 mt-auto">
        <PromptInput
          onSubmit={(message, e) => {
            e.preventDefault();

            if (message.text) {
              sendMessage({ text: message.text });
              setInput('');
            }
          }}
          className="self-end"
        >
          <PromptInputTextarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={`What's on your mind...`}
            disabled={isLoading}
            className="flex-1"
          />
          <PromptInputSubmit disabled={isLoading} className="mr-2" />
        </PromptInput>
      </div>
    </div>
  );
};

export default ChatPage;
