import { GenerativeModel, GoogleGenerativeAI } from '@google/generative-ai';
import { Provider } from '@nestjs/common';
import { env } from 'src/config/env.config';
import { GEMINI_PRO_MODEL, GEMINI_PRO_VISION_MODEL } from './gemini.contants';
import { GENERATION_CONFIG, SAFETY_SETTINGS } from 'src/config/gemini.config';

export const GeminiProModelProvider: Provider<GenerativeModel> = {
  provide: GEMINI_PRO_MODEL,
  useFactory: () => {
    const genAI = new GoogleGenerativeAI(env().GEMINI.KEY);
    return genAI.getGenerativeModel({
      model: env().GEMINI.PRO_MODEL,
      generationConfig: GENERATION_CONFIG,
      safetySettings: SAFETY_SETTINGS,
    });
  },
};

export const GeminiProVisionModelProvider: Provider<GenerativeModel> = {
  provide: GEMINI_PRO_VISION_MODEL,
  useFactory: () => {
    const genAI = new GoogleGenerativeAI(env().GEMINI.KEY);
    console.log(genAI)
    return genAI.getGenerativeModel({
      model: env().GEMINI.PRO_VISION_MODEL,
      generationConfig: GENERATION_CONFIG,
      safetySettings: SAFETY_SETTINGS,
    });
  },
};