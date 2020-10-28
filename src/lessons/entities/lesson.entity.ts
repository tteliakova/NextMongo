import { Prop, raw, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';

@Schema()
export class Lesson extends mongoose.Document {
  @Prop({ required: true, index: true })
  title: string;

  @Prop({ required: true, index: true })
  order: number;

  @Prop({ required: true, index: true })
  description: string;

  @Prop(
    raw({
      videos: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Video' }],
      keynotes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Keynote' }],
    }),
  )
  content: {
    videos: string[];
    keynotes: string[];
  };

  @Prop(mongoose.SchemaTypes.Mixed)
  payload: Record<string, any>;
}

export const LessonSchema = SchemaFactory.createForClass(Lesson);
LessonSchema.index({
  title: 1,
  order: 1,
  description: 1,
});

