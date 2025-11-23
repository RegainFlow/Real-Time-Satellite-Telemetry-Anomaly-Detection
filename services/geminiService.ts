import { GoogleGenAI } from "@google/genai";
import { AnomalyEvent, TelemetryData } from "../types";

const getClient = () => {
  const apiKey = process.env.API_KEY;
  if (!apiKey) {
    throw new Error("API Key not found");
  }
  return new GoogleGenAI({ apiKey });
};

export const analyzeAnomaly = async (event: AnomalyEvent, recentTelemetry: TelemetryData[]) => {
  try {
    const ai = getClient();
    
    // Prepare a summarized context of telemetry around the event
    const telemetryContext = recentTelemetry
      .slice(-10)
      .map(t => `Time: ${t.timestamp}, Volts: ${t.voltage}V, Temp: ${t.temperature}C`)
      .join('\n');

    const prompt = `
      You are a Satellite Operations AI Assistant. 
      Analyze the following anomaly event and telemetry snippet.
      
      Event: ${event.type} (${event.severity})
      Description: ${event.description}
      Telemetry Context (Last 10 readings):
      ${telemetryContext}

      Provide a concise root cause analysis (under 50 words) and 3 recommended immediate actions.
      Format the response as JSON.
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        responseMimeType: "application/json",
      }
    });

    return response.text;
  } catch (error) {
    console.error("Gemini Analysis Failed", error);
    throw error;
  }
};
