import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from 'recharts';
import { TelemetryData } from '../types';

interface TelemetryChartProps {
  data: TelemetryData[];
}

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="glass-panel p-3 rounded-lg border border-primary/20 shadow-xl">
        <p className="font-mono text-xs text-gray-400 mb-1">{label}</p>
        <p className="text-primary font-bold text-sm">
          Voltage: {payload[0].value.toFixed(2)}V
        </p>
        <p className="text-purple-400 font-bold text-sm">
          Temp: {payload[1].value.toFixed(1)}°C
        </p>
      </div>
    );
  }
  return null;
};

export const TelemetryChart: React.FC<TelemetryChartProps> = ({ data }) => {
  return (
    <div className="h-[300px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          data={data}
          margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
        >
          <defs>
            <linearGradient id="colorVolt" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#00d6cb" stopOpacity={0.3}/>
              <stop offset="95%" stopColor="#00d6cb" stopOpacity={0}/>
            </linearGradient>
            <linearGradient id="colorTemp" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#a855f7" stopOpacity={0.3}/>
              <stop offset="95%" stopColor="#a855f7" stopOpacity={0}/>
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" vertical={false} />
          <XAxis 
            dataKey="timestamp" 
            tick={{ fill: '#666', fontSize: 10, fontFamily: 'JetBrains Mono' }} 
            axisLine={false}
            tickLine={false}
          />
          <YAxis 
            tick={{ fill: '#666', fontSize: 10, fontFamily: 'JetBrains Mono' }} 
            axisLine={false}
            tickLine={false}
            domain={['auto', 'auto']}
          />
          <Tooltip content={<CustomTooltip />} />
          <Area 
            type="monotone" 
            dataKey="voltage" 
            stroke="#00d6cb" 
            strokeWidth={2}
            fillOpacity={1} 
            fill="url(#colorVolt)" 
          />
          <Area 
            type="monotone" 
            dataKey="temperature" 
            stroke="#a855f7" 
            strokeWidth={2}
            fillOpacity={1} 
            fill="url(#colorTemp)" 
          />
          {data.map((entry, index) => (
             entry.isAnomaly && <ReferenceLine key={index} x={entry.timestamp} stroke="#ef4444" strokeDasharray="3 3" />
          ))}
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};
