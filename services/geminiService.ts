import { GoogleGenAI, Type, Schema } from "@google/genai";
import { TranslationResponse } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const responseSchema: Schema = {
  type: Type.OBJECT,
  properties: {
    translatedText: {
      type: Type.STRING,
      description: "The full translated text in Chinese. Paragraphs should be preserved.",
    },
    technicalTerms: {
      type: Type.ARRAY,
      description: "A list of key technical terms found in the text.",
      items: {
        type: Type.OBJECT,
        properties: {
          original: { type: Type.STRING, description: "The term in English" },
          translation: { type: Type.STRING, description: "The term in Chinese" },
          explanation: { type: Type.STRING, description: "A brief explanation of the term in Chinese context" },
        },
        required: ["original", "translation", "explanation"],
      },
    },
  },
  required: ["translatedText", "technicalTerms"],
};

export const translateContent = async (text: string): Promise<TranslationResponse> => {
  try {
    const prompt = `
      You are a professional technical translator. 
      Translate the following English text into professional, academic-level Chinese.
      
      Rules:
      1. Maintain a professional, objective tone.
      2. Preserve specific technical terms in English where appropriate, or use the format 'Chinese Translation (English Term)' for the first occurrence.
      3. Ensure the flow is natural for a native Chinese speaker.
      4. Extract a list of important technical terms found in the text and provide their Chinese translation and a brief explanation.
      
      Input Text:
      ${text}
    `;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: responseSchema,
        temperature: 0.3, // Lower temperature for more deterministic/accurate technical translation
      },
    });

    if (response.text) {
      return JSON.parse(response.text) as TranslationResponse;
    } else {
      throw new Error("Empty response from Gemini");
    }
  } catch (error) {
    console.error("Translation error:", error);
    throw error;
  }
};
