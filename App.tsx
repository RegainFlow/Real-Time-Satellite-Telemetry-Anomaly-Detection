import React, { useState, useEffect, useCallback } from 'react';
import { StatCard } from './components/StatCard';
import { TelemetryChart } from './components/TelemetryChart';
import { SatelliteVisualizer } from './components/SatelliteVisualizer';
import { analyzeAnomaly } from './services/geminiService';
import { AnomalyEvent, TelemetryData } from './types';
import { Icons } from './components/Icons';

// --- MOCK DATA GENERATION ---
const generateTelemetry = (points: number): TelemetryData[] => {
  const data: TelemetryData[] = [];
  const now = new Date();
  for (let i = points; i > 0; i--) {
    const time = new Date(now.getTime() - i * 1000 * 60);
    const isAnomaly = Math.random() > 0.95;
    data.push({
      timestamp: time.toLocaleTimeString([], { hour12: false, hour: '2-digit', minute: '2-digit' }),
      voltage: 28 + Math.sin(i * 0.1) + (isAnomaly ? Math.random() * 5 : 0),
      temperature: 45 + Math.cos(i * 0.1) * 2 + (isAnomaly ? Math.random() * 10 : 0),
      signalStrength: -80 + Math.random() * 5,
      isAnomaly: isAnomaly && Math.random() > 0.5 // Rare spikes
    });
  }
  return data;
};

const mockAnomalies: AnomalyEvent[] = [
  { id: '1', satelliteId: 'SAT-001', type: 'Voltage Spike', timestamp: '10:42:15', severity: 'warning', description: 'Bus voltage exceeded 32V for 500ms', status: 'new' },
  { id: '2', satelliteId: 'SAT-001', type: 'Thermal Runaway', timestamp: '09:15:00', severity: 'critical', description: 'Battery cell temp > 60C', status: 'investigating' },
  { id: '3', satelliteId: 'SAT-001', type: 'Signal Loss', timestamp: '08:30:22', severity: 'info', description: 'Brief downlink interruption', status: 'resolved' },
];

const App: React.FC = () => {
  const [telemetry, setTelemetry] = useState<TelemetryData[]>([]);
  const [selectedAnomaly, setSelectedAnomaly] = useState<AnomalyEvent | null>(null);
  const [aiAnalysis, setAiAnalysis] = useState<any | null>(null);
  const [analyzing, setAnalyzing] = useState(false);
  const [apiKeyMissing, setApiKeyMissing] = useState(false);

  // Initialize data
  useEffect(() => {
    setTelemetry(generateTelemetry(30));
  }, []);

  // Simulate Live Data
  useEffect(() => {
    const interval = setInterval(() => {
      setTelemetry(prev => {
        const lastTime = new Date();
        const nextTime = lastTime.toLocaleTimeString([], { hour12: false, hour: '2-digit', minute: '2-digit' });
        const isAnomaly = Math.random() > 0.98;
        const newVal = {
          timestamp: nextTime,
          voltage: 28 + Math.random() * (isAnomaly ? 5 : 1),
          temperature: 45 + Math.random() * (isAnomaly ? 8 : 2),
          signalStrength: -80 + Math.random() * 2,
          isAnomaly
        };
        return [...prev.slice(1), newVal];
      });
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const handleAnalyze = async (event: AnomalyEvent) => {
    setAnalyzing(true);
    setAiAnalysis(null);
    setApiKeyMissing(false);
    
    if (!process.env.API_KEY) {
      setApiKeyMissing(true);
      setAnalyzing(false);
      return;
    }

    try {
      const result = await analyzeAnomaly(event, telemetry);
      try {
        setAiAnalysis(JSON.parse(result));
      } catch (e) {
        setAiAnalysis({ rootCause: result, recommendations: [] });
      }
    } catch (err) {
      console.error(err);
    } finally {
      setAnalyzing(false);
    }
  };

  return (
    <div className="min-h-screen font-sans text-gray-200 selection:bg-primary/30 pb-12">
      {/* HEADER */}
      <header className="fixed top-0 w-full z-50 glass-panel border-b border-white/5 h-16 flex items-center justify-between px-6">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded bg-primary/20 flex items-center justify-center text-primary border border-primary/50">
            <Icons.Globe size={20} />
          </div>
          <span className="font-display font-bold text-xl tracking-wide text-white">
            REGAIN<span className="text-primary">FLOW</span> SENTINEL
          </span>
        </div>
        <div className="flex items-center gap-6">
          <div className="hidden md:flex items-center gap-2 text-xs font-mono text-primary bg-primary/10 px-3 py-1 rounded-full border border-primary/20 animate-pulse">
            <div className="w-2 h-2 rounded-full bg-primary" />
            LIVE TELEMETRY
          </div>
          <button className="p-2 hover:bg-white/5 rounded-full transition-colors relative">
            <Icons.Bell size={20} />
            <span className="absolute top-2 right-2 w-2 h-2 bg-error rounded-full" />
          </button>
          <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-primary to-blue-600 border border-white/20" />
        </div>
      </header>

      <main className="pt-24 px-6 max-w-[1600px] mx-auto space-y-6">
        
        {/* KPI ROW */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard label="System Health" value="98.2%" trend="0.4%" trendUp={true} icon="Activity" />
          <StatCard label="Active Anomalies" value="3" trend="2" trendUp={false} icon="Alert" alert={true} />
          <StatCard label="Downlink Rate" value="450 Mbps" trend="Stable" trendUp={true} icon="Radio" />
          <StatCard label="Avg Temp" value="45.2°C" icon="Temp" />
        </div>

        {/* MAIN VISUALIZATION ROW */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[450px]">
          {/* Chart Section */}
          <div className="lg:col-span-2 glass-panel rounded-2xl p-6 flex flex-col">
            <div className="flex justify-between items-center mb-6">
              <h2 className="font-display font-semibold text-lg flex items-center gap-2">
                <Icons.Activity className="text-primary" size={18} />
                Real-time Voltage & Thermal Telemetry
              </h2>
              <div className="flex gap-2">
                 {['1H', '24H', '7D'].map(period => (
                   <button key={period} className={`text-xs px-3 py-1 rounded-md border transition-all ${period === '1H' ? 'bg-primary/20 border-primary/40 text-primary' : 'border-white/10 hover:bg-white/5 text-gray-400'}`}>
                     {period}
                   </button>
                 ))}
              </div>
            </div>
            <div className="flex-1 w-full min-h-0">
               <TelemetryChart data={telemetry} />
            </div>
          </div>

          {/* 3D Map Placeholder / Satellite Status */}
          <div className="glass-panel rounded-2xl p-6 flex flex-col relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary to-transparent opacity-50" />
            <h2 className="font-display font-semibold text-lg mb-4 z-10 relative">Orbit Status: SAT-001</h2>
            <div className="flex-1 rounded-xl bg-black/40 border border-white/5 overflow-hidden relative">
               <SatelliteVisualizer />
            </div>
            <div className="mt-4 grid grid-cols-2 gap-4 z-10">
              <div className="bg-white/5 rounded-lg p-3 border border-white/5">
                <span className="text-xs text-gray-400 block mb-1">ECLIPSE MODE</span>
                <span className="text-sm font-mono text-white">INACTIVE</span>
              </div>
              <div className="bg-white/5 rounded-lg p-3 border border-white/5">
                <span className="text-xs text-gray-400 block mb-1">MANEUVER</span>
                <span className="text-sm font-mono text-success">READY</span>
              </div>
            </div>
          </div>
        </div>

        {/* BOTTOM ROW: FEED & ANALYSIS */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          
          {/* Anomaly Feed */}
          <div className="glass-panel rounded-2xl p-6">
            <div className="flex justify-between items-center mb-6">
               <h2 className="font-display font-semibold text-lg">Detected Anomalies</h2>
               <button className="text-xs text-primary hover:text-white transition-colors">View History</button>
            </div>
            <div className="space-y-3">
              {mockAnomalies.map(anomaly => (
                <div 
                  key={anomaly.id} 
                  onClick={() => setSelectedAnomaly(anomaly)}
                  className={`p-4 rounded-xl border cursor-pointer transition-all duration-200 group
                    ${selectedAnomaly?.id === anomaly.id 
                      ? 'bg-white/10 border-primary/50 shadow-neon' 
                      : 'bg-white/5 border-white/5 hover:bg-white/10 hover:border-white/20'}
                  `}
                >
                  <div className="flex justify-between items-start">
                    <div className="flex items-start gap-3">
                      <div className={`mt-1 w-2 h-2 rounded-full ${anomaly.severity === 'critical' ? 'bg-error shadow-[0_0_10px_#ef4444]' : 'bg-warning'}`} />
                      <div>
                        <h4 className="font-medium text-white group-hover:text-primary transition-colors">{anomaly.type}</h4>
                        <p className="text-sm text-gray-400 mt-1">{anomaly.description}</p>
                      </div>
                    </div>
                    <span className="font-mono text-xs text-gray-500">{anomaly.timestamp}</span>
                  </div>
                  <div className="mt-3 flex gap-2">
                    <span className="text-[10px] uppercase tracking-wider px-2 py-0.5 rounded bg-black/30 text-gray-400 border border-white/5">
                      {anomaly.satelliteId}
                    </span>
                    <span className={`text-[10px] uppercase tracking-wider px-2 py-0.5 rounded border border-white/5 ${anomaly.status === 'new' ? 'bg-blue-500/20 text-blue-400' : 'bg-green-500/20 text-green-400'}`}>
                      {anomaly.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* AI Analysis Section */}
          <div className="glass-panel rounded-2xl p-6 flex flex-col">
             <div className="flex justify-between items-center mb-6">
               <h2 className="font-display font-semibold text-lg flex items-center gap-2">
                 <Icons.Cpu className="text-primary" size={18} />
                 AI Root Cause Analysis
               </h2>
             </div>

             {selectedAnomaly ? (
               <div className="flex-1 flex flex-col">
                  <div className="mb-4 p-4 rounded-lg bg-primary/5 border border-primary/20">
                    <h3 className="text-sm font-semibold text-primary mb-1">Analysing Event: {selectedAnomaly.type}</h3>
                    <p className="text-xs text-gray-400">Model: Gemini 2.5 Flash | Context: Last 10m Telemetry</p>
                  </div>

                  {!aiAnalysis ? (
                    <div className="flex-1 flex items-center justify-center flex-col gap-4">
                       <p className="text-sm text-gray-400 text-center max-w-xs">
                         Run a deep learning inference on this anomaly to detect root cause and get mitigation steps.
                       </p>
                       <button 
                        onClick={() => handleAnalyze(selectedAnomaly)}
                        disabled={analyzing}
                        className="bg-primary hover:bg-primary-dark text-black font-semibold py-2 px-6 rounded-lg shadow-neon transition-all hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                       >
                         {analyzing ? <Icons.Activity className="animate-spin" /> : <Icons.Zap size={18} fill="currentColor" />}
                         {analyzing ? 'Processing...' : 'Run Diagnostics'}
                       </button>
                       {apiKeyMissing && <p className="text-error text-xs mt-2">API Key missing in env.</p>}
                    </div>
                  ) : (
                    <div className="flex-1 space-y-4 animate-slide">
                      <div className="space-y-2">
                        <h4 className="text-xs uppercase tracking-widest text-gray-500 font-bold">Root Cause</h4>
                        <p className="text-sm leading-relaxed text-white bg-black/20 p-3 rounded border border-white/10">
                          {aiAnalysis.rootCause || "Analysis complete."}
                        </p>
                      </div>
                      <div className="space-y-2">
                         <h4 className="text-xs uppercase tracking-widest text-gray-500 font-bold">Recommended Actions</h4>
                         <ul className="space-y-2">
                           {aiAnalysis.recommendations?.map((rec: string, i: number) => (
                             <li key={i} className="flex items-start gap-2 text-sm text-gray-300">
                               <Icons.Check size={16} className="text-success mt-0.5 shrink-0" />
                               {rec}
                             </li>
                           )) || <li className="text-sm text-gray-400">No specific recommendations.</li>}
                         </ul>
                      </div>
                      <div className="mt-auto pt-4 flex justify-end">
                         <button 
                          onClick={() => setAiAnalysis(null)}
                          className="text-xs text-gray-400 hover:text-white underline"
                         >
                           Clear Analysis
                         </button>
                      </div>
                    </div>
                  )}
               </div>
             ) : (
               <div className="flex-1 flex items-center justify-center flex-col text-gray-500">
                  <Icons.Search size={48} className="opacity-20 mb-4" />
                  <p>Select an anomaly from the feed to begin analysis.</p>
               </div>
             )}
          </div>

        </div>
      </main>
    </div>
  );
};

export default App;
