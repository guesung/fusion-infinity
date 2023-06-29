import { useRouter } from 'next/router';

import Button from '@/components/buttons/Button';
import Logo from '@/components/Logo';

export default function HomePage() {
  const router = useRouter();
  return (
    <div className='flex min-h-screen flex-col items-center justify-center bg-white p-4 pb-12'>
      <div className='flex flex-grow items-center justify-center'>
        <Logo />
      </div>

      <Button
        text='모바일 통지서 연결하기'
        onClick={() => {
          router.push('/data');
        }}
      />
    </div>
  );
}
