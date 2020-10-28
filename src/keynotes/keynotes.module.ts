import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { KeynotesService } from './keynotes.service';
import { KeynotesController } from './keynotes.controller';
import { Keynote, KeynoteSchema } from './entities/keynote.entity';

@Module({
  providers: [KeynotesService],
  controllers: [KeynotesController],
  imports: [
    MongooseModule.forFeature([
      {
        name: Keynote.name,
        schema: KeynoteSchema,
      },
    ]),
  ],
})
export class KeynotesModule {}
