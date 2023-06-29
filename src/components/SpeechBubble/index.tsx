import { motion } from 'framer-motion';

interface SpeechBubbleProps {
  type: 'answer' | 'question' | 'suggest';
  className?: string;
  children: React.ReactNode;
  onClick?: () => void;
}

const typeCssMap = {
  suggest:
    'mb-4 rounded-[1.5rem_1.5rem_0_1.5rem] border border-solid border-[rgba(0,177,166,0.10)] p-4 text-[#00B1A6] shadow-[0_0_0.5rem_0_rgba(0,177,166,0.20)] active:bg-[#00B1A6] active:text-white',
  answer:
    'mb-[1.25rem] rounded-[1.5rem_1.5rem_1.5rem_0] border border-solid border-[#00B1A6] p-4 text-[#00B1A6]',
  question:
    'mb-[.75rem] rounded-[1.5rem_1.5rem_0_1.5rem] border border-solid border-[rgba(0,177,166,0.10)] p-4 bg-[#00B1A6] text-white',
};

const SpeechBubble = ({
  children,
  type,
  className = '',
  onClick,
}: SpeechBubbleProps) => {
  if (type === 'suggest') {
    return (
      <div className='flex justify-end'>
        <span
          className={`${typeCssMap['suggest']} ${className} cursor-pointer`}
          onClick={onClick}
        >
          {children}
        </span>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 100 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, transition: { duration: 0.15 } }}
      className={`flex ${type === 'answer' ? 'justify-start' : 'justify-end'}`}
    >
      <span
        className={`${typeCssMap[type]} ${className} whitespace-pre-wrap`}
        onClick={onClick}
      >
        {children}
      </span>
    </motion.div>
  );
};

export default SpeechBubble;
