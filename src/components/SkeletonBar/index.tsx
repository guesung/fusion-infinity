import React from 'react';

interface SkeletonBarProps {
  className?: string;
}

/**
 * className으로 h-3 w-3 등등 tailwind 문법을 사용해서 넣어야함
 */
const SkeletonBar = ({ className = '' }: SkeletonBarProps) => {
  return (
    <div
      className={`animate-skeleton overflow-hidden rounded-md bg-[rgb(237,237,237)] ${className} h-full`}
    />
  );
};

export default SkeletonBar;
