export interface TelemetryData {
  timestamp: string;
  voltage: number;
  temperature: number;
  signalStrength: number;
  isAnomaly: boolean;
}

export interface AnomalyEvent {
  id: string;
  satelliteId: string;
  type: string;
  timestamp: string;
  severity: 'critical' | 'warning' | 'info';
  description: string;
  status: 'new' | 'investigating' | 'resolved';
}

export interface SatelliteStats {
  id: string;
  name: string;
  orbit: string;
  health: number;
  status: 'nominal' | 'degraded' | 'critical';
  lastContact: string;
}
