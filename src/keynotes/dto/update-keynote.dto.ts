import { PartialType } from '@nestjs/swagger';
import { CreateKeynoteoDto } from './create-keynote.dto';

export class UpdateKeynoteDto extends PartialType(CreateKeynoteoDto) {}
