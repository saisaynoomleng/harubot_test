import {
  convertToModelMessages,
  createUIMessageStreamResponse,
  stepCountIs,
  streamText,
  toUIMessageStream,
} from 'ai';
import { NextRequest, NextResponse } from 'next/server';
import { openai } from '@ai-sdk/openai';
import { env } from '@/lib/env/server';
import { SYSTEM_PROMPT } from '@/lib/agent/systemPrompt';
import { AgentTools } from '@/lib/agent/tools';

export const maxDuration = 30;

export async function POST(req: NextRequest) {
  try {
    const { messages } = await req.json();

    const result = streamText({
      model: openai(env.AGENT_MODEL),
      instructions: SYSTEM_PROMPT,
      messages: await convertToModelMessages(messages),
      stopWhen: stepCountIs(5),
      maxOutputTokens: 1000,
      tools: AgentTools,
    });

    return createUIMessageStreamResponse({
      stream: toUIMessageStream({ stream: result.stream }),
    });
  } catch (error) {
    console.error('api/chat error', error);

    return NextResponse.json({
      error: 'Failed to process chat request',
      details: error instanceof Error ? error.message : 'Unknown Error',
    });
  }
}
