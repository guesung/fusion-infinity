import Image from 'next/image';
import { useRouter } from 'next/router';

import Button from '@/components/buttons/Button';

export default function ResultPage() {
  const router = useRouter();

  return (
    <div className='flex h-full flex-col p-4 pb-12'>
      <div className='my-5 mt-10 flex items-center gap-[0.375rem] text-[1.25rem] font-bold'>
        <Image alt='logo' src='/svg/main-logo.svg' width={30} height={30} />
        <p className='text-main text-xl'>EnerGPT</p>
      </div>
      <div className='flex h-full flex-col gap-4'>
        <div className='rounded-3xl bg-white p-4'>
          <h1 className='text-bold mb-6 text-[20px] leading-tight'>
            지난달 같은 기간 보다
            <br />
            <span className='text-main'>11,189 더 사용</span>하고 있어요.
          </h1>
          <div className='flex justify-center gap-10'>
            <div className='flex w-[100px] flex-col items-center text-[.875rem]'>
              <p>지난달</p>
              <p className='flex items-center gap-[.3125rem]'>
                <b className='text-[24px]'>142.8</b>kwh
              </p>
              <p>12,345원</p>
            </div>
            <span className='bg-main my-[.3125rem] w-[.0625rem] items-stretch'></span>
            <div className='flex w-[100px] flex-col items-center text-[.875rem]'>
              <p>이번달</p>
              <p className='flex items-center gap-[.3125rem]'>
                <b className='text-[24px]'>267</b>kwh
              </p>
              <p>23,534원</p>
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
