import { Body, Controller, HttpStatus, Post, Res } from '@nestjs/common';
import { Response } from 'express';
import { GptService } from './gpt.service';
import { RequestOpenAiDto } from './dtos';

@Controller('gpt')
export class GptController {
  constructor(private readonly gptService: GptService) {}

  @Post('orthography-check')
  ortographyCheck(@Body() orthographyDto: RequestOpenAiDto) {
    return this.gptService.orthographyCheck(orthographyDto);
  }
  @Post('pros-cons-discusser')
  prosConsDicusser(@Body() proConDiscusserDto: RequestOpenAiDto) {
    return this.gptService.prosConsDicusser(proConDiscusserDto);
  }

  @Post('pros-cons-discusser-stream')
  async prosConsDicusserStream(
    @Body() proConDiscusserDto: RequestOpenAiDto,
    @Res() res: Response,
  ) {
    const stream =
      await this.gptService.prosConsDicusserStream(proConDiscusserDto);
    res.setHeader('Content-Type', 'application/json');
    res.status(HttpStatus.OK);
    for await (const chunk of stream) {
      const piece = chunk.choices[0].delta.content || '';
      console.log(piece);
      res.write(piece);
    }
    res.end();
  }
}
