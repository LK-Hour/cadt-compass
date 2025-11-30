import { IsString, IsEnum, IsUUID, IsOptional, MinLength, MaxLength } from 'class-validator';
import { FeedbackType } from '@prisma/client';

export class CreateFeedbackDto {
  @IsUUID()
  userId: string;

  @IsEnum(FeedbackType)
  type: FeedbackType;

  @IsString()
  @MinLength(3)
  @MaxLength(200)
  subject: string;

  @IsString()
  @MinLength(10)
  @MaxLength(1000)
  description: string;

  @IsString()
  @IsOptional()
  location?: string;
}
