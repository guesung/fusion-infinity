import { AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useState } from 'react';

import Input from '@/components/Input';
import SpeechBubble from '@/components/SpeechBubble';

const APIURL = 'https://api.openai.com/v1/chat/completions';

export default function ChatPage() {
  const [messages, setMessages] = useState<
    {
      type: 'answer' | 'question';
      content: string;
    }[]
  >([]);
  const [question, setQuestion] = useState('');

  const router = useRouter();

  const runOpenAI = async () => {
    const messageData = [];
    messageData.push({
      role: 'system',
      content: question,
    });

    const response = await fetch(APIURL, {
      method: 'POST',
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: messageData,
        max_tokens: 300,
        temperature: 0.7,
        stream: true,
        top_p: 1,
        presence_penalty: 0,
        frequency_penalty: 0,
        n: 1,
      }),

      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_OPENAI_API_KEY}`,
      },
    });

    if (!response.body) return;
    const reader = response.body.getReader();
    const decoder = new TextDecoder('utf-8');

    let isFirst = true;

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      const decodedCunk = decoder.decode(value);
      const lines = decodedCunk.split('\n');

      const parsedLines = lines
        .map((line) => line.replace(/^data: /, '').trim())
        .filter((line) => line !== '' && line !== '[DONE]')
        .map((line) => JSON.parse(line));

      for (const parsedLine of parsedLines) {
        const { choices } = parsedLine;
        const { delta } = choices[0];
        const { content } = delta;

        if (content) {
          if (isFirst) {
            setMessages((prev) => [
              ...prev,
              {
                type: 'answer',
                content: content,
              },
            ]);
            // setAnswer(content);
            isFirst = false;
          } else {
            // setAnswer((answer) => answer + content);
            setMessages((prev) => [
              ...prev.slice(0, prev.length - 1),
              {
                type: 'answer',
                content: prev[prev.length - 1].content + content,
              },
            ]);
          }
        }
      }
    }
  };

  return (
    <div className='flex h-screen max-h-screen flex-col pb-10'>
      <div className='mb-[.375rem] flex flex-grow flex-col bg-white p-4 pt-14'>
        <div className='flex justify-between pb-[1.125rem]'>
          <Image
            src='/svg/arrow-back.svg'
            alt='arrow-back'
            height={24}
            width={24}
            onClick={() => router.push('/result')}
            className='cursor-pointer'
          />
          <div className='flex items-center gap-1'>
            <span className='font-bold'>채팅목록</span>
            <Image
              src='/svg/list.svg'
              alt='list'
              height={24}
              width={24}
              className='cursor-pointer'
            />
          </div>
        </div>
        <div className='my-4 rounded-3xl bg-[rgba(0,177,166,0.10)] px-4 py-5 leading-tight text-[#999]'>
          안녕하세요! 우리 모두의 에너지 절약 AI 솔루션입니다.
          <br />
          저에게 무엇이든 요청해주세요.
        </div>
        <div className='flex flex-grow flex-col overflow-y-scroll'>
          <div className={`${messages.length ? 'hidden' : ''}`}>
            <div className='flex items-center justify-end pb-[.5625rem] pt-[.6875rem]'>
              <Image
                src='/svg/contact-support.svg'
                alt='contact-support'
                height={24}
                width={24}
              />
              <p className='text-main text-[.875rem] font-bold'>추천 질문</p>
            </div>
            <SpeechBubble
              type='suggest'
              onClick={() => {
                setMessages((prev) => [
                  ...prev,
                  {
                    type: 'question',
                    content: '우리집에서 낭비되고 있는 에너지 항목은?',
                  },
                ]);
                runOpenAI();
              }}
            >
              우리집에서 낭비되고 있는 에너지 항목은?
            </SpeechBubble>
            <SpeechBubble
              type='suggest'
              onClick={() => {
                setMessages((prev) => [
                  ...prev,
                  {
                    type: 'question',
                    content: '전기에너지 절약 방법은?',
                  },
                ]);
                runOpenAI();
              }}
            >
              전기에너지 절약 방법은?
            </SpeechBubble>
            <SpeechBubble
              type='suggest'
              onClick={() => {
                setMessages((prev) => [
                  ...prev,
                  {
                    type: 'question',
                    content: '평균 에너지 소비량을 넘긴 항목을 분석해줘.',
                  },
                ]);
                runOpenAI();
              }}
            >
              평균 에너지 소비량을 넘긴 항목을 분석해줘.
            </SpeechBubble>
          </div>
        </div>

        <div className='flex-grow'></div>

        <AnimatePresence>
          {messages.map((message, index) => (
            <SpeechBubble key={index} type={message.type}>
              {message.content}
            </SpeechBubble>
          ))}
        </AnimatePresence>
      </div>
      <div className='px-4'>
        <Input
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          onClick={() => {
            runOpenAI();
            setMessages((prev) => [
              ...prev,
              {
                type: 'question',
                content: question,
              },
            ]);
            setQuestion('');
          }}
        />
      </div>
    </div>
  );
}
