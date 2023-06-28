import Image from 'next/image';
import { useRouter } from 'next/router';

import Button from '@/components/buttons/Button';

export default function Result() {
  const router = useRouter();

  return (
    <div className='flex h-full flex-col p-4 pb-12'>
      <div className='mb-10 ml-4 text-[1.25rem] font-bold'>서비스명 ---</div>
      <div className='flex h-full flex-col gap-4'>
        <div className='rounded-3xl bg-white p-4'>
          <h1 className='text-bold mb-6 text-[20px] leading-tight'>
            지난달 같은 기간 보다
            <br />
            <span className='text-main'>11,557원 더 사용</span>하고 있어요.
          </h1>
          <div className='flex justify-center gap-10'>
            <div className='flex w-[100px] flex-col items-center text-[.875rem]'>
              <p>지난달</p>
              <p className='flex items-center gap-[.3125rem]'>
                <b className='text-[24px]'>142.4</b>kwh
              </p>
              <p>13,234원</p>
            </div>
            <span className='bg-main my-[.3125rem] w-[.0625rem] items-stretch'></span>
            <div className='flex w-[100px] flex-col items-center text-[.875rem]'>
              <p>지난달</p>
              <p className='flex items-center gap-[.3125rem]'>
                <b className='text-[24px]'>142.4</b>kwh
              </p>
              <p>13,234원</p>
            </div>
          </div>
        </div>
        <div className='flex flex-grow flex-col items-center gap-[2.8125rem] rounded-3xl bg-white px-5 py-6'>
          <Image src='/svg/graph.svg' alt='graph' height={160} width={318} />
          <Image
            src='/svg/circle-graph.svg'
            alt='graph'
            height={160}
            width={266}
          />
        </div>
        <Button
          text='AI 맞춤형 솔루션 받기'
          onClick={() => router.push('/chat')}
        />
      </div>
    </div>
  );
}
