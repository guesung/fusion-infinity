import Image from 'next/image';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onClick: () => void;
}

export default function Input({
  value,
  onChange,
  onClick,
  ...props
}: InputProps) {
  const pressEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.nativeEvent.isComposing) {
      // isComposing 이 true 이면
      return; // 조합 중이므로 동작을 막는다.
    }

    if (e.key === 'Enter' && e.shiftKey) {
      // [shift] + [Enter]
      return;
    } else if (e.key === 'Enter') {
      // [Enter] 치면 메시지 보내기
      onClick();
    }
  };
  return (
    <div className='border-main relative h-[3rem] w-full rounded-full border'>
      <input
        value={value}
        onChange={onChange}
        className='h-full  w-full rounded-full px-4 outline-none'
        onKeyDown={pressEnter}
        {...props}
      />
      <div
        className={`absolute inset-y-0 -right-1  my-auto mr-2 flex h-[2.625rem] w-[2.625rem] items-center justify-center rounded-full bg-[#F2F6F5] ${
          value ? 'bg-main' : ''
        }`}
      >
        <Image
          src={`/svg/arrow-up${value ? '-white' : ''}.svg`}
          alt='arrow'
          width={30}
          height={30}
          onClick={onClick}
          className={`${value ? 'cursor-pointer' : ''}`}
        />
      </div>
    </div>
  );
}
