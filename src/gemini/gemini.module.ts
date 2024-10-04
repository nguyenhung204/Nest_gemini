import { Module } from '@nestjs/common';
import { GeminiController } from './presenters/http/gemini.controller';
import { GeminiService } from './application/gemini.service';
import { ConfigModule } from '@nestjs/config';
import {
  GeminiProModelProvider,
  GeminiProVisionModelProvider,
} from './gemini.provider';
import { env } from 'src/config/env.config';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true, load: [env] })],
  controllers: [GeminiController],
  providers: [
    GeminiService,
    GeminiProModelProvider,
    GeminiProVisionModelProvider,
  ],
})
export class GeminiModule {}
