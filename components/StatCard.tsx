import React from 'react';
import { Icons } from './Icons';

interface StatCardProps {
  label: string;
  value: string;
  trend?: string;
  trendUp?: boolean;
  icon: keyof typeof Icons;
  alert?: boolean;
}

export const StatCard: React.FC<StatCardProps> = ({ label, value, trend, trendUp, icon, alert }) => {
  const IconComponent = Icons[icon];

  return (
    <div className={`
      glass-panel rounded-2xl p-6 relative overflow-hidden group transition-all duration-300
      hover:shadow-neon hover:border-primary/30
      ${alert ? 'border-error/40 shadow-[0_0_15px_rgba(239,68,68,0.15)]' : ''}
    `}>
      <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
        <IconComponent size={64} className={alert ? 'text-error' : 'text-primary'} />
      </div>
      
      <div className="flex flex-col h-full justify-between relative z-10">
        <div className="flex items-center gap-3 mb-2">
          <div className={`p-2 rounded-lg ${alert ? 'bg-error/10 text-error' : 'bg-primary/10 text-primary'}`}>
            <IconComponent size={20} />
          </div>
          <span className="text-gray-400 text-sm font-medium tracking-wide uppercase">{label}</span>
        </div>
        
        <div className="mt-2">
          <h3 className="text-3xl font-display font-bold text-white tracking-tight">{value}</h3>
          {trend && (
            <p className={`text-xs mt-1 font-mono flex items-center gap-1 ${trendUp ? 'text-success' : 'text-error'}`}>
              {trendUp ? '↑' : '↓'} {trend}
            </p>
          )}
        </div>
      </div>
      
      {/* Decorative Glow */}
      <div className={`absolute -bottom-4 -left-4 w-24 h-24 rounded-full blur-3xl opacity-20 ${alert ? 'bg-error' : 'bg-primary'}`} />
    </div>
  );
};
