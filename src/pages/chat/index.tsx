import { AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

import Input from '@/components/Input';
import SpeechBubble from '@/components/SpeechBubble';

const APIURL = 'https://api.openai.com/v1/chat/completions';

const messages: {
  type: 'answer' | 'question';
  content: string;
}[] = [
  {
    type: 'question',
    content: '우리집에서 낭비되고 있는 에너지 항목은?',
  },
  {
    type: 'answer',
    content: '사용자의 집에서 낭비되고 있는 에너지는 전기에너지 입니다.',
  },
  {
    type: 'question',
    content: '전기에너지를 절약할 수 있는 방법은?',
  },
  {
    type: 'answer',
    content: `전기 에너지 절약을 위한 방법:
    - 절전 가전제품 선택 
    - 조명 관리 
    - 에어컨 및 난방 사용
    - 창문과 창문 씰링
    - 스탠바이 모드 제거
    - 전기차 주행 및 충전 관리
    - 절전 모드 활용`,
  },
];

export default function ChatPage() {
  const [answer, setAnswer] = useState('');
  const runOpenAI = async () => {
    const messageData = [];
    messageData.push({
      role: 'system',
      content: '우리집에서 낭비되고 있는 에너지 항목은?',
    });
    const response = await fetch(APIURL, {
      method: 'POST',
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: messageData as any,
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
    const isFirst = true;
    while (true) {
      const chunk = await reader.read();
      const { done, value } = chunk;
      if (done) break;
      const decodedCunk = decoder.decode(value);
      const lines = decodedCunk.split('\n');
      const parse = lines.map((line) => line[0]);
      const parsedLines = lines
        .map((line) => line.replace(/^data: /, '').trim())
        .filter((line) => line !== '' && line !== '[DONE]')
        .map((line) => JSON.parse(line));
      for (const parsedLine of parsedLines) {
        const { choices } = parsedLine;
        const { delta } = choices[0];
        const { content } = delta;
        console.log(content);
        if (content) {
          // console.log(content);
          // if (isFirst) {
          //   setChatMessageListState([
          //     ...chatMessageListState,
          //     {
          //       type: "message",
          //       id: chatMessageListState.length + 1,
          //       message: content,
          //       isMine: false,
          //     },
          //   ]);
          //   isFirst = false;
          // } else {
          setAnswer((answer) => answer + content);
          // }
        }
      }
    }
    // console.log('aaaaa' + answer);
    // setChatMessageListState((prev: chatMessageType[]) => [
    //   ...prev,
    //   {
    //     type: "button",
    //     id: prev.length + 1,
    //     message: userInfo.selectQuestionList,
    //     isMine: false,
    //   },
    // ]);
  };
  useEffect(() => {
    runOpenAI();
  }, []);
  // console.log(answer);

  const [isShowSuggest, setIsShowSuggest] = useState(true);
  const [step, setStep] = useState(0);

  const router = useRouter();

  useEffect(() => {
    if (step === 1) {
      setIsShowSuggest(false);
    }

    if (step % 2 === 0) {
      return;
    }

    setTimeout(() => {
      setStep((prev) => prev + 1);
    }, 1000);
  }, [step]);

  return (
    <div className='flex h-screen flex-col pb-10'>
      {/* {answer} */}
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
        <div className='flex flex-grow flex-col overflow-y-scroll transition-all'>
          <div className={`${isShowSuggest ? '' : 'hidden'}`}>
            <div className='flex items-center justify-end pb-[.5625rem] pt-[.6875rem]'>
              <Image
                src='/svg/contact-support.svg'
                alt='contact-support'
                height={24}
                width={24}
              />
              <p className='text-main text-[.875rem] font-bold'>추천 질문</p>
            </div>
            <SpeechBubble type='suggest' onClick={() => setStep(1)}>
              우리집에서 낭비되고 있는 에너지 항목은?
            </SpeechBubble>
            <SpeechBubble type='suggest'>전기에너지 절약 방법은?</SpeechBubble>
            <SpeechBubble type='suggest'>
              평균 에너지 소비량을 넘긴 항목을 분석해줘.
            </SpeechBubble>
          </div>
        </div>

        <div className='flex-grow'></div>

        {messages.slice(0, step).map((message, index) => (
          <AnimatePresence key={index}>
            <SpeechBubble type={message.type}>{message.content}</SpeechBubble>
          </AnimatePresence>
        ))}
      </div>
      <div className='px-4'>
        <Input onClick={() => setStep((prev) => prev + 1)} />
      </div>
    </div>
  );
}
