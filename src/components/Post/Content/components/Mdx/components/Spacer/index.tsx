const heightClasses = {
  1: 'h-4', 
  2: 'h-8',
  3: 'h-12',
  4: 'h-16',
  5: 'h-30',
  6: 'h-36',
  8: 'h-48',
  10: 'h-60'
} as const;


type Props = {
  lines?: keyof typeof heightClasses;
  className?: string;
};

export default function Spacer({ lines = 1, className = '' }: Props) {
  const heightClass = heightClasses[lines];
  
  return (
    <div 
      className={`w-full ${heightClass} ${className}`}
      aria-hidden="true"
    />
  );
} 