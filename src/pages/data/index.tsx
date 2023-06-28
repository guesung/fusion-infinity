import { useRouter } from 'next/router';

import Button from '@/components/buttons/Button';

export default function DataPage() {
  const router = useRouter();
  return (
    <div className='flex h-full flex-col items-center justify-center bg-white p-4 pb-12'>
      <div className='flex flex-grow items-center justify-center'>Logo</div>
      <Button
        text='데이터 분석하기'
        onClick={() => {
          router.push('/result');
        }}
      />
    </div>
  );
}
