import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';

@Schema()
export class Class extends mongoose.Document {
  @Prop({ required: true, index: true })
  title: string;

  @Prop({ required: true, index: true })
  description: string;

  @Prop({ required: true, index: true })
  order: number;

  @Prop(mongoose.SchemaTypes.Mixed)
  duration: Record<string, any>;

  @Prop([{ type: mongoose.Schema.Types.ObjectId, ref: 'Lesson' }])
  lessons: string[];

  @Prop([{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }])
  users: string[];
}

export const ClassSchema = SchemaFactory.createForClass(Class);
ClassSchema.index({
  title: 1,
  description: 1,
  order: 1,
  duration: 1,
});
