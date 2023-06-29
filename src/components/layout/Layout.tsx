import type { PropsWithChildren } from 'react';

export default function Layout({ children }: PropsWithChildren) {
  return (
    <div className='min-h-screen w-screen bg-gray-400'>
      <main className='mx-auto h-full min-h-screen w-full min-w-[360px] max-w-[440px] bg-[#F2F6F5]'>
        {children}
      </main>
    </div>
  );
}
