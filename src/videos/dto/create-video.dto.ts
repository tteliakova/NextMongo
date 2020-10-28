import { IsString, IsInt, Min, Max } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateVideoDto {
  @ApiProperty({ example: 'Node.js introduction' })
  @IsString()
  readonly title: string;

  @ApiProperty({ example: 1 })
  @IsInt()
  @Min(1)
  @Max(999)
  readonly order: number;

  @ApiProperty({ example: 'https://lectrum.io/videos/lesson-1' })
  @IsString()
  readonly uri: string;
}
