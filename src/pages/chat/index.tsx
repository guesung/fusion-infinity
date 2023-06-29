/* eslint-disable no-constant-condition */
import { AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useEffect, useRef, useState } from 'react';

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

  const scrollRef = useRef<HTMLDivElement>(null);

  const runOpenAI = async (text: string) => {
    const messageData = [
      {
        role: 'system',
        content: `너는 우리 서비스 'EnerGPT' 의 챗봇이야. 우리 서비스는 사용자의 에너지 사용량을 분석해 에너지 절약 방법을 제공해주는 서비스야. 너는 사용자의 질문에 답변을 해주는 역할을 맡고 있어. `,
      },
      {
        role: 'system',
        content: `
        
        이건 우리집에서 나온 통지서야. 
        이번 달  총 183,295원
이건 고정비야.

일반관리비 45,590원
청소비 13,390원
승강기유지비 3,420원
수선유지비 6,310원
장기수선충당금 12,620원
경비비 13,506원
공동전기료 9,340원
승강기전기 2,860원
공동수도료 8,689원
기본난방비 10,560원

이건 변동비야.

전기료 39,350원
수도료 13,390원
가스료 2,150원
난방비 5,310원
        `,
      },
      {
        role: 'system',
        content: `사용자가 질문하면 너는 답변할 때 친절하고 쉽고 짧고 깔끔하게 답변해야돼. 이제 질문 시작할게.`,
      },
    ];
    messageData.push({
      role: 'system',
      content: text,
    });

    const response = await fetch(APIURL, {
      method: 'POST',
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: messageData,
        max_tokens: 600,
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
            isFirst = false;
          } else {
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

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

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
        <div className='flex h-[300px] flex-grow flex-col overflow-y-scroll'>
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

                runOpenAI('우리집에서 낭비되고 있는 에너지 항목은?');
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

                runOpenAI('전기에너지 절약 방법은?');
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

                runOpenAI('평균 에너지 소비량을 넘긴 항목을 분석해줘.');
              }}
            >
              평균 에너지 소비량을 넘긴 항목을 분석해줘.
            </SpeechBubble>
          </div>

          <div className='flex-grow'></div>

          <AnimatePresence>
            {messages.map((message, index) => (
              <SpeechBubble key={index} type={message.type}>
                {message.content}
              </SpeechBubble>
            ))}
          </AnimatePresence>
          <div ref={scrollRef}></div>
        </div>
      </div>
      <div className='px-4'>
        <Input
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          onClick={() => {
            setMessages((prev) => [
              ...prev,
              {
                type: 'question',
                content: question,
              },
            ]);

            runOpenAI(question);
            setQuestion('');
          }}
        />
      </div>
    </div>
  );
}
