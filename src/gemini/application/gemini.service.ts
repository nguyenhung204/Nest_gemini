import {
  Inject,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { GEMINI_PRO_MODEL, GEMINI_PRO_VISION_MODEL } from '../gemini.contants';
import { GenerativeModel } from '@google/generative-ai';
import { createContent } from 'src/config/helper/content.helper';
import { GenAiResponse } from '../interface/response.interface';
import { AnalyzeImage } from '../interface/analyze-images.interface';

@Injectable()
export class GeminiService {
  constructor(
    @Inject(GEMINI_PRO_MODEL) private readonly proModel: GenerativeModel,
    @Inject(GEMINI_PRO_VISION_MODEL)
    private readonly proVisionModel: GenerativeModel,
  ) {}

  async generateText(prompt: string): Promise<GenAiResponse> {
    const contents = createContent(prompt);

    const { totalTokens } = await this.proModel.countTokens({ contents });
    const result = await this.proModel.generateContent({ contents });
    const response = result.response;
    const text = response.text();

    return { totalTokens, text };
  }

  async generateTextFromMultiModal(
    prompt: string,
    file: Express.Multer.File,
  ): Promise<GenAiResponse> {
    try {
      const contents = createContent(prompt, file);

      const { totalTokens } = await this.proVisionModel.countTokens({
        contents,
      });
      const result = await this.proVisionModel.generateContent({ contents });
      const response = result.response;
      const text = response.text();

      return { totalTokens, text };
    } catch (err) {
      if (err instanceof Error) {
        throw new InternalServerErrorException(err.message, err.stack);
      }
      throw err;
    }
  }

  async analyzeImages({
    prompt,
    firstImage,
    secondImage,
  }: AnalyzeImage): Promise<GenAiResponse> {
    try {
      const contents = createContent(prompt, firstImage, secondImage);
      const { totalTokens } = await this.proVisionModel.countTokens({
        contents,
      });
      const result = await this.proVisionModel.generateContent({ contents });
      const response = result.response;
      const text = response.text();

      return { totalTokens, text };
    } catch (err) {
      if (err instanceof Error) {
        throw new InternalServerErrorException(err.message, err.stack);
      }
      throw err;
    }
  }
}
