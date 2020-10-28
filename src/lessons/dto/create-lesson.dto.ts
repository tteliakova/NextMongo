import {
  IsString,
  IsInt,
  Min,
  Max,
  ValidateNested,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer/decorators';

class ContentDto {
  @ApiProperty({ example: 'videoHash' })
  @IsString({ each: true })
  videos: string[];

  @ApiProperty({ example: 'keynoteHash' })
  @IsString({ each: true })
  keynotes: string[];
}

export class CreateLessonDto {
  @ApiProperty({ example: 'Lesson 1: Introduction' })
  @IsString()
  readonly title: string;

  @ApiProperty({ example: 'Description for lesson 1' })
  @IsString()
  readonly description: string;

  @ApiProperty({ example: 1 })
  @IsInt()
  @Min(1)
  @Max(9999)
  readonly order: number;

  @ValidateNested({ each: true })
  @Type(() => ContentDto)
  readonly content: ContentDto;
}
