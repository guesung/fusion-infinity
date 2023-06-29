import { AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

import Input from '@/components/Input';
import SpeechBubble from '@/components/SpeechBubble';

type Message = {
  type: 'answer' | 'question';
  content: string;
};

export default function ChatPage() {
  const [isShowSuggest, setIsShowSuggest] = useState(true);
  const [step, setStep] = useState(0);
  const messages: Message[] = [
    {
      type: 'question',
      content: '우리집에서 낭비되고 있는 에너지 항목은?',
    },
    {
      type: 'answer',
      content: '사용자의 집에서 낭비되고 있는 에너지는 전기에너지 입니다.',
    },
  ];

  const router = useRouter();

  useEffect(() => {
    if (step === 1) {
      setIsShowSuggest(false);
    }
  }, [step]);

  return (
    <div className='flex h-screen flex-col pb-10'>
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
          안녕하세요! 모두를 위한 AI 포털 뤼튼이에요.
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
            <SpeechBubble type='suggest'>
              우주복을 입은 강아지 캐릭터를 그려줘.
              <br />
              우주복을 입은 강아지 캐릭터를 그려줘.
            </SpeechBubble>
            <SpeechBubble type='suggest' className='m'>
              우주복을 입은 강아지 캐릭터를 그려줘.
            </SpeechBubble>
          </div>
        </div>

        <div className='flex-grow'></div>

        {messages.slice(0, step).map((message, index) => (
          <AnimatePresence key={index}>
            <SpeechBubble type={message.type} onClick={() => setStep(step + 1)}>
              {message.content}
            </SpeechBubble>
          </AnimatePresence>
        ))}
      </div>
      <div className='px-4'>
        <Input onClick={() => setStep((prev) => prev + 1)} />
      </div>
    </div>
  );
}
