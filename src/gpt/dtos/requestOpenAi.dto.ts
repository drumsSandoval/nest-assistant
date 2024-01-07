import { IsInt, IsOptional, IsString } from 'class-validator';

export class RequestOpenAiDto {
  @IsString()
  readonly prompt: string;
  @IsInt()
  @IsOptional()
  readonly maxTokens: number;
}
