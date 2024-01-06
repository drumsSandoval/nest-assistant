import { Injectable } from '@nestjs/common';
import { OrthographyDto } from './dtos/orthography.dto';
import { ortographyCheckUseCase } from './use-cases/orthography.use-case';
import OpenAI from 'openai';

@Injectable()
export class GptService {
  private openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
    organization: process.env.OPENAI_ORGANIZATION,
  });

  async ortographyCheck(ortographyDto: OrthographyDto) {
    return await ortographyCheckUseCase(this.openai, {
      prompt: ortographyDto.prompt,
    });
  }
}
