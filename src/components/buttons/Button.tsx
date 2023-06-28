interface ButtonProps {
  text: string;
  onClick: () => void;
}
export default function Button({ text, ...rest }: ButtonProps) {
  return (
    <button
      className='bg-main infinite animate-beatingHeart h-[3.75rem] w-full rounded-[1rem] text-[1.25rem] text-white duration-500'
      {...rest}
    >
      {text}
    </button>
  );
}
