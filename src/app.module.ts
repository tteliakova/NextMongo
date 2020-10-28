import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './auth/guards/jwt-auth.guard';
import { ConfigModule } from '@nestjs/config';
import { VideosModule } from './videos/videos.module';
import { KeynotesModule } from './keynotes/keynotes.module';
import { LessonsModule } from './lessons/lessons.module';
import { ClassesModule } from './classes/classes.module';

@Module({
  imports: [
    MongooseModule.forRootAsync({
      useFactory: () => ({
        uri: 'mongodb://localhost:27017/nest-course',
        useCreateIndex: true,
      }),
    }),
    AuthModule,
    UsersModule,
    AuthModule,
    // CommonModule,
    ConfigModule.forRoot({
      // envFilePath: '.env',
      // ignoreEnvFile: false,
      // validationSchema: Joi.object({
      //   DATABASE_HOST: Joi.required(),
      //   DATABASE_PORT: Joi.number().default(5432),
      // }),
      // load: [appConfig],
    }),
    VideosModule,
    KeynotesModule,
    LessonsModule,
    ClassesModule,
  ],
  controllers: [AppController],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
    AppService,
  ],
})
export class AppModule {}
