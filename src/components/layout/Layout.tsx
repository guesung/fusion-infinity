import type { PropsWithChildren } from 'react';

export default function Layout({ children }: PropsWithChildren) {
  return (
    <div className='h-screen w-screen bg-gray-400'>
      <main className='mx-auto h-full w-full min-w-[360px] max-w-[440px] bg-white'>
        {children}
      </main>
    </div>
  );
}
