import { Injectable } from '@nestjs/common';
import { RequestOpenAiDto } from './dtos';
import AssistantHandler from 'src/AssistantHandler';

@Injectable()
export class GptService {
  private assistantHandler = new AssistantHandler();

  async orthographyCheck(ortographyDto: RequestOpenAiDto) {
    return await this.assistantHandler.orthographyCheck({
      prompt: ortographyDto.prompt,
    });
  }

  async prosConsDicusser({ prompt }: RequestOpenAiDto) {
    return await this.assistantHandler.prosConsDicusser({
      prompt,
    });
  }

  async prosConsDicusserStream({ prompt }: RequestOpenAiDto) {
    return await this.assistantHandler.prosConsDicusserStream({
      prompt,
    });
  }
}
