import { AnomalyEvent, TelemetryData } from "../types";

// Mock analysis data generator - simulates custom ML model output
const mockAnalysisDatabase: Record<string, any> = {
  'Voltage Spike': {
    rootCause: "Sudden power surge detected in solar array regulator circuit. Bus voltage exceeded safe operating threshold (32V) due to transient load imbalance during battery charge cycle transition.",
    recommendations: [
      "Activate redundant power conditioning unit (PCU-B)",
      "Reduce non-critical payload power consumption by 15%",
      "Monitor battery cell voltages for thermal runaway indicators"
    ],
    confidence: 0.87,
    modelVersion: "SatAnomalyNet-v2.3"
  },
  'Thermal Runaway': {
    rootCause: "Battery cell temperature exceeded critical threshold (60°C) indicating potential lithium-ion thermal runaway. Likely caused by overcharging during eclipse exit or internal cell degradation.",
    recommendations: [
      "Immediately isolate affected battery cell from main bus",
      "Engage active thermal management system at maximum capacity",
      "Prepare for emergency power mode if temperature continues rising"
    ],
    confidence: 0.92,
    modelVersion: "SatAnomalyNet-v2.3"
  },
  'Signal Loss': {
    rootCause: "Brief downlink interruption caused by atmospheric interference or ground station antenna tracking error. Signal strength dropped below -95 dBm threshold for 12 seconds.",
    recommendations: [
      "Switch to backup ground station for redundancy",
      "Verify antenna pointing accuracy using star tracker data",
      "Increase transmission power by 3dB if interference persists"
    ],
    confidence: 0.78,
    modelVersion: "SatAnomalyNet-v2.3"
  }
};

export const analyzeAnomaly = async (event: AnomalyEvent, recentTelemetry: TelemetryData[]): Promise<string> => {
  // Simulate processing delay for realism
  await new Promise(resolve => setTimeout(resolve, 1500 + Math.random() * 1000));

  // Get mock analysis based on anomaly type
  const analysis = mockAnalysisDatabase[event.type] || {
    rootCause: `Anomaly detected in ${event.type}. Analysis indicates deviation from normal operational parameters based on recent telemetry patterns.`,
    recommendations: [
      "Continue monitoring telemetry for pattern changes",
      "Review historical data for similar occurrences",
      "Consult mission control for manual verification"
    ],
    confidence: 0.65,
    modelVersion: "SatAnomalyNet-v2.3"
  };

  // Add telemetry context
  const avgVoltage = recentTelemetry.slice(-10).reduce((sum, t) => sum + t.voltage, 0) / 10;
  const avgTemp = recentTelemetry.slice(-10).reduce((sum, t) => sum + t.temperature, 0) / 10;

  return JSON.stringify({
    ...analysis,
    telemetryContext: {
      avgVoltage: avgVoltage.toFixed(2),
      avgTemperature: avgTemp.toFixed(1),
      samplesAnalyzed: recentTelemetry.length
    }
  });
};
