
import { GoogleGenAI, Type } from "@google/genai";
import type { Message } from '../types';

if (!process.env.API_KEY) {
  console.warn("API_KEY environment variable not set. Gemini features will be disabled.");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY! });

const model = 'gemini-2.5-flash';

export const generateSmartReplies = async (conversationHistory: Message[]): Promise<string[]> => {
  if (!process.env.API_KEY) {
    // Return mock replies if API key is not available
    return ["Got it!", "Thanks!", "How can I help?"];
  }

  const prompt = `
    Based on the last few messages in this conversation, suggest three concise and relevant smart replies.
    The user you are generating replies for is "${conversationHistory[conversationHistory.length-1]?.author.name}".
    Conversation:
    ${conversationHistory.slice(-5).map(msg => `${msg.author.name}: ${msg.type === 'TEXT' ? msg.content : `[${msg.type}]`}`).join('\n')}
  `;

  try {
    const response = await ai.models.generateContent({
      model,
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            replies: {
              type: Type.ARRAY,
              items: {
                type: Type.STRING
              },
              description: "An array of three short smart reply suggestions."
            }
          }
        }
      }
    });

    const jsonText = response.text.trim();
    const result = JSON.parse(jsonText);
    return result.replies || [];
  } catch (error) {
    console.error("Error generating smart replies:", error);
    return ["Yes", "No", "Okay"];
  }
};
