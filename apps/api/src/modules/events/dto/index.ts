import { IsString, IsEnum, IsDateString, IsBoolean, IsOptional, IsInt, Min, IsUUID } from 'class-validator';
import { EventType } from '@prisma/client';

export class CreateEventDto {
  @IsString()
  title: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsEnum(EventType)
  type: EventType;

  @IsDateString()
  startTime: string;

  @IsDateString()
  endTime: string;

  @IsString()
  location: string;

  @IsString()
  organizer: string;

  @IsString()
  @IsOptional()
  imageUrl?: string;

  @IsBoolean()
  @IsOptional()
  registrationRequired?: boolean;

  @IsInt()
  @Min(1)
  @IsOptional()
  maxParticipants?: number;
}

export class UpdateEventDto {
  @IsString()
  @IsOptional()
  title?: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsEnum(EventType)
  @IsOptional()
  type?: EventType;

  @IsDateString()
  @IsOptional()
  startTime?: string;

  @IsDateString()
  @IsOptional()
  endTime?: string;

  @IsString()
  @IsOptional()
  location?: string;

  @IsString()
  @IsOptional()
  organizer?: string;

  @IsString()
  @IsOptional()
  imageUrl?: string;

  @IsBoolean()
  @IsOptional()
  registrationRequired?: boolean;

  @IsInt()
  @Min(1)
  @IsOptional()
  maxParticipants?: number;
}

export class RegisterEventDto {
  @IsUUID()
  userId: string;
}
