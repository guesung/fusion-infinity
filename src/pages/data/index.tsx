import Image from 'next/image';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { CircleSpinner } from 'react-spinner-overlay';

import Button from '@/components/buttons/Button';
import Skeleton from '@/components/Skeleton';

export default function Data() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [afterLoading, setAfterLoading] = useState(false);
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);
  if (afterLoading) {
    setTimeout(() => {
      router.push('/result');
    }, 1000);
  }

  return (
    <div className='flex h-full flex-col justify-center p-4 pb-12 '>
      {afterLoading && (
        <div>
          <div className='absolute inset-0 z-10 m-auto h-full w-full bg-black opacity-40' />
          <div className='absolute inset-0 m-auto flex items-center justify-center'>
            <CircleSpinner color='#00B1A6' />
          </div>
        </div>
      )}

      <div className='my-5 mt-10 flex items-center gap-[0.375rem] text-[1.25rem] font-bold'>
        <Image alt='logo' src='/svg/main-logo.svg' width={30} height={30} />
        <p className='text-main text-xl'>에너지 지킴이</p>
      </div>
      <div className='mb-5 flex w-full flex-grow flex-col  rounded-[1.5rem] bg-white px-4 py-[1.5rem]'>
        <div className='h-[5rem]'>
          <div>
            <h2 className='font-bold'>이번 달 통지서</h2>
            <div className='h-6 w-28'>
              {loading ? (
                <Skeleton />
              ) : (
                <h2 className='text-[1.25rem] font-bold'>183,295원</h2>
              )}
            </div>
          </div>
        </div>
        <div className='my-2 border-[0.5px]  border-[#D9D9D9]' />
        <div className='h-[30rem]'>
          <div>
            <h2 className='my-3 mt-5 text-base font-bold'>고정비</h2>
            <div className='flex justify-between '>
              <div>
                <p>일반관리비</p>
                <p>청소비</p>
                <p>승강기유지비</p>
                <p>수선유지비</p>
                <p>장기수선충당금</p>
                <p>경비비</p>
                <p>공동전기료</p>
                <p>승강기전기</p>
                <p>공동수도료</p>
                <p>기본난방비</p>
              </div>
              <div className='text-right'>
                {loading ? (
                  <div>
                    {new Array(10).fill(1).map((_, i) => (
                      <Skeleton className='h-6 w-20' key={i} />
                    ))}
                  </div>
                ) : (
                  <div>
                    <p>45,590원</p>
                    <p>13,390원</p>
                    <p>3,420원</p>
                    <p>6,310원</p>
                    <p>12,620원</p>
                    <p>13,506원</p>
                    <p>9,340원</p>
                    <p>2,860원</p>
                    <p>8,689원</p>
                    <p>10,560원</p>
                  </div>
                )}
              </div>
            </div>
            <div className='h-5' />
            <h2 className=' my-3 text-base font-bold'>변동비</h2>
            <div className='flex justify-between'>
              <div>
                <p>전기료</p>
                <p>수도료</p>
                <p>가스료</p>
                <p>난방비</p>
              </div>

              <div className='text-right'>
                {loading ? (
                  <div>
                    {new Array(4).fill(1).map((_, i) => (
                      <Skeleton className='h-6 w-20' key={i} />
                    ))}
                  </div>
                ) : (
                  <div>
                    <p>39,350원</p>
                    <p>13,390원</p>
                    <p>2,150원</p>
                    <p>5,310원</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <Button
        text='데이터 분석하기'
        onClick={() => {
          setAfterLoading(true);
        }}
      />
    </div>
  );
}
