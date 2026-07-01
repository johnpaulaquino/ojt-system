import { ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
  className?: string;
}

// The main container for the card
export function Card({ children, className = '' }: CardProps) {
  return (
    <div 
      className={`bg-[#111111] border border-gray-800 rounded-xl shadow-sm overflow-hidden ${className}`}
    >
      {children}
    </div>
  );
}

// Optional Header if you need a title area separated by a line
export function CardHeader({ 
  title, 
  subtitle, 
  action, 
  className = '' 
}: { 
  title: string; 
  subtitle?: string; 
  action?: ReactNode;
  className?: string;
}) {
  return (
    <div className={`px-6 py-5 border-b border-gray-800 flex justify-between items-center ${className}`}>
      <div>
        <h3 className="text-lg font-semibold text-white">{title}</h3>
        {subtitle && <p className="mt-1 text-sm text-gray-400">{subtitle}</p>}
      </div>
      {action && <div>{action}</div>}
    </div>
  );
}

// The inner padding area for your forms or lists
export function CardBody({ children, className = '' }: CardProps) {
  return (
    <div className={`p-6 md:p-8 ${className}`}>
      {children}
    </div>
  );
}