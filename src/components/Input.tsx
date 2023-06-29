import Image from 'next/image';
import { useState } from 'react';

interface InputProps {
  onClick: () => void;
}

export default function Input({ onClick }: InputProps) {
  const [text, setText] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
  };

  return (
    <div className='border-main relative h-[3rem] w-full rounded-full border'>
      <input
        value={text}
        onChange={handleChange}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            onClick();
            setText('');
          }
        }}
        className='h-full  w-full rounded-full px-4 outline-none'
      />
      <div
        className={`absolute inset-y-0 -right-1  my-auto mr-2 flex h-[2.625rem] w-[2.625rem] items-center justify-center rounded-full bg-[#F2F6F5] ${
          text ? 'bg-main' : ''
        }`}
      >
        <Image
          src={`/svg/arrow-up${text ? '-white' : ''}.svg`}
          alt='arrow'
          width={30}
          height={30}
          onClick={onClick}
          className={`${text ? 'cursor-pointer' : ''}`}
        />
      </div>
    </div>
  );
}
