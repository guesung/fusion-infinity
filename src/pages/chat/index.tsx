import Image from 'next/image';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

import Input from '@/components/Input';
import SpeechBubble from '@/components/SpeechBubble';

export default function ChatPage() {
  const [isShowSuggest, setIsShowSuggest] = useState(true);
  const [step, setStep] = useState(0);

  const router = useRouter();

  const handleClick = () => {
    if (step === 1) {
      setStep(2);
      return;
    }
    if (step === 2) {
      // 시나리오 종료
    }
  };

  useEffect(() => {
    if (step === 1) {
      setIsShowSuggest(false);
    }
  }, [step]);

  return (
    <div className='flex h-full flex-col pb-10'>
      <div className='mb-[.375rem] flex flex-grow flex-col bg-white p-4'>
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
        <div className='my-4 rounded-3xl bg-[rgba(0,177,166,0.10)] px-4 py-5 leading-none text-[#999]'>
          안녕하세요! 모두를 위한 AI 포털 뤼튼이에요.
          <br />
          저에게 무엇이든 요청해주세요.
        </div>
        <div className='flex flex-grow flex-col overflow-y-scroll'>
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
        <SpeechBubble type='question'>
          우리집에서 낭비되고 있는 에너지 항목은?
        </SpeechBubble>
        <SpeechBubble type='answer'>
          사용자의 집에서 낭비되고 있는 에너지는 전기에너지 입니다.
        </SpeechBubble>
      </div>
      <div className='px-4'>
        <Input onClick={handleClick} />
      </div>
    </div>
  );
}
