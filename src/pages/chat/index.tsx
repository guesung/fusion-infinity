import Image from 'next/image';
import { useRouter } from 'next/router';

export default function ChatPage() {
  const router = useRouter();

  return (
    <div className='p-4'>
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
      <div className='flex items-center justify-end pb-[.5625rem] pt-[.6875rem]'>
        <Image
          src='/svg/contact-support.svg'
          alt='contact-support'
          height={24}
          width={24}
        />
        <p className='text-main text-[.875rem] font-bold'>추천 질문</p>
      </div>
    </div>
  );
}
