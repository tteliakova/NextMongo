import { IsString, IsEnum } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { SEX, ROLE } from '../types';

export class CreateUserDto {
  @ApiProperty({ description: 'The name of a user.', example: 'John Doe' })
  @IsString()
  readonly name: string;

  @ApiProperty({ description: 'The email of a user.' })
  @IsString()
  readonly email: string;

  @ApiProperty({ description: 'The phone of a user.' })
  @IsString()
  readonly phone: string;

  @ApiProperty({ description: 'The password of a user.' })
  @IsString()
  readonly password: string;

  @ApiProperty({ description: 'The sex of a user.' })
  @IsEnum(SEX)
  readonly sex: SEX;

  @ApiProperty({ description: 'The role of a user.' })
  @IsEnum(ROLE)
  readonly role: ROLE;
}
