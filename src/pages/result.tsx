import { useRouter } from 'next/router';

import Button from '@/components/buttons/Button';

export default function Page2() {
  const router = useRouter();
  return (
    <div className='relative flex h-full items-center justify-center'>
      <div>Logo</div>
      <div className='fixed bottom-5 left-0 right-0 m-auto w-[25rem]'>
        <Button
          text='데이터 분석하기'
          onClick={() => {
            router.push('/page3');
          }}
        />
      </div>
    </div>
  );
}
