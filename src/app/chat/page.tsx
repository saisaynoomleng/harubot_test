'use client';

import { useState } from 'react';
import { useChat } from '@ai-sdk/react';
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
import { DigitalClock } from '@/components/DigitalClock';
import { type GeoLocation } from '@/lib/types';

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
                  {message.role === 'assistant'
                    ? message.parts.map((part, i) => {
                        switch (part.type) {
                          case 'text':
                            return (
                              <MessageResponse key={`${message.id}-${i}`}>
                                {part.text}
                              </MessageResponse>
                            );

                          case 'tool-getDateTime':
                            if (part.state === 'output-available') {
                              return (
                                <DigitalClock
                                  key={part.toolCallId}
                                  location={part.output as GeoLocation}
                                />
                              );
                            }

                            return (
                              <div
                                key={part.toolCallId}
                                className="flex items-center gap-2"
                              >
                                <LoadingSpinner />
                                <span>Finding local time...</span>
                              </div>
                            );
                        }
                      })
                    : message.parts.map(
                        (part) => part.type === 'text' && part.text,
                      )}
                </MessageContent>
              </Message>
            ))
          )}

          {isLoading && (
            <Message from="assistant">
              <MessageContent>
                <div className="flex gap-x-2 items-center">
                  <p className="shimmer">
                    {status === 'streaming'
                      ? 'Haru is typing...'
                      : 'Haru is thinking...'}
                  </p>
                  <LoadingSpinner />
                </div>
              </MessageContent>
            </Message>
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
