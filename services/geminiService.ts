
import { GoogleGenAI } from "@google/genai";

// Fixed: Correctly initialize GoogleGenAI using named parameter and direct environment variable
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const getStylistAdvice = async (userPrompt: string) => {
  try {
    // Fixed: Always use ai.models.generateContent and the recommended gemini-3-flash-preview model for Q&A tasks
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: userPrompt,
      config: {
        systemInstruction: "You are 'Dellyz Empire Stylist', a high-end fashion consultant. You are helpful, sophisticated, and expert in matching outfits for various occasions (weddings, business, casual, athletic). Recommend items from DELLYZ EMPIRE: tops, jeans, skirts, glasses, jewelry, bags, shoes, heels, biker shorts, gowns, slippers, caps, watches. Keep answers stylish and concise.",
        temperature: 0.7,
      },
    });
    // Fixed: Correctly accessing the text property from the response
    return response.text || "I'm sorry, I couldn't generate advice right now. Please try again.";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "The Stylist is currently unavailable. Please browse our collections!";
  }
};
