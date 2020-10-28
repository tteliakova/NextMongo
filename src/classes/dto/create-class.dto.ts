import {
  IsString,
  IsInt,
  Min,
  Max,
  ValidateNested,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer/decorators';

class DurationDto {
  @ApiProperty({ example: '2019-06-19T07:44:06.353Z' })
  @IsString()

  started: string[];

  @ApiProperty({ example: '2019-06-19T07:44:06.353Z' })
  @IsString()
  closed: string[];
}

export class CreateClassDto {
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
  @Type(() => DurationDto)
  readonly duration: DurationDto;
}
