import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { LessonsService } from './lessons.service';
import { LessonsController } from './lessons.controller';
import { Lesson, LessonSchema } from './entities/lesson.entity';

@Module({
  providers: [LessonsService],
  controllers: [LessonsController],
  imports: [
    MongooseModule.forFeature([
      {
        name: Lesson.name,
        schema: LessonSchema,
      },
    ]),
  ],
})
export class LessonsModule {}
