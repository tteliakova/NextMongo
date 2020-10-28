import { Module } from '@nestjs/common';
import { ClassesService } from './classes.service';
import { ClassesController } from './classes.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Class, ClassSchema } from './entities/class.entity';
import { Lesson, LessonSchema } from '../lessons/entities/lesson.entity';
import { User, UserSchema } from '../users/entities/user.entity';

@Module({
  providers: [ClassesService],
  controllers: [ClassesController],
  imports: [
    MongooseModule.forFeature([
      {
        name: Class.name,
        schema: ClassSchema,
      },
      {
        name: Lesson.name,
        schema: LessonSchema,
      },
      {
        name: User.name,
        schema: UserSchema,
      },
    ]),
  ],
})
export class ClassesModule {}
