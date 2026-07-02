import { ReactNode } from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
}

export function Card({ children, className = '' }: CardProps) {
  return (
    <div className={`bg-card border border-border rounded-xl shadow-sm ${className}`}>
      {children}
    </div>
  );
}

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


export function CardBody({ children, className = '' }: CardProps) {
  return (
    <div className={`p-6 ${className}`}>
      {children}
    </div>
  );
}