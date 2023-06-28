interface ButtonProps {
  text: string;
}
export default function Button({ text }: ButtonProps) {
  return (
    <button className='bg-main h-[3.75rem] w-full rounded-[1rem] text-[1.25rem] text-white'>
      {text}
    </button>
  );
}
