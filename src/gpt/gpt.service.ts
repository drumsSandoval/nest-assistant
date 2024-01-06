import { Injectable } from '@nestjs/common';
import { OrthographyDto } from './dtos/orthography.dto';
import AssistantHandler from 'src/AssistantHandler';

@Injectable()
export class GptService {
  private assistantHandler = new AssistantHandler();
  async orthographyCheck(ortographyDto: OrthographyDto) {
    return await this.assistantHandler.orthographyCheckUseCase({
      prompt: ortographyDto.prompt,
    });
  }
}
