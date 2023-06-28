import React, { ReactNode } from 'react';

interface SpeechBubbleProps {
  type: 'answer' | 'question' | 'suggest';
  children: ReactNode;
}
const typeCssMap = {
  suggest:
    'rounded-[1.5rem_1.5rem_0_1.5rem] border border-solid border-[rgba(0,177,166,0.10)] p-4 text-[#00B1A6] shadow-[0_0_0.5rem_0_rgba(0,177,166,0.20)] active:bg-[#00B1A6] active:text-white',
  answer:
    'rounded-[1.5rem_1.5rem_1.5rem_0] border border-solid border-[#00B1A6] p-4 text-[#00B1A6]',
  question:
    'rounded-[1.5rem_1.5rem_0_1.5rem] border border-solid border-[rgba(0,177,166,0.10)] p-4 bg-[#00B1A6] text-white',
};

const SpeechBubble = ({ children, type }: SpeechBubbleProps) => {
  return <div className={typeCssMap[type]}>{children}</div>;
};

export default SpeechBubble;
