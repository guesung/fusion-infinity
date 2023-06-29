import Image from 'next/image';
import React from 'react';

const Logo = () => {
  return (
    <div className='flex items-center justify-start '>
      <Image
        src='/svg/main-logo.svg'
        alt='logo'
        width={120}
        height={120}
        className='animate-mainLogo [animation-fill-mode:forwards]'
      />
      <span className='animate-mainText text-[26px] font-bold leading-6 text-[#00B1A6] [animation-fill-mode:forwards]'>
        EnerGPT
      </span>
    </div>
  );
};

export default Logo;
