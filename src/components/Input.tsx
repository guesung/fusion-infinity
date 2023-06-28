import Image from 'next/image';

export default function Input() {
  return (
    <div className='border-main relative h-[3rem] w-full rounded-full border'>
      <input className='h-full  w-full rounded-full' />
      <div className='absolute inset-y-0 -right-1  my-auto mr-2 flex h-[2.625rem] w-[2.625rem] items-center justify-center rounded-full bg-[#F2F6F5]'>
        <Image src='/svg/arrow_back.svg' alt='arrow' width={30} height={30} />
      </div>
    </div>
  );
}
