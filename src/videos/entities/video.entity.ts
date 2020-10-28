import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';

@Schema()
export class Video extends mongoose.Document {
  @Prop({ required: true, index: true })
  title: string;

  @Prop({ required: true, index: true })
  order: number;

  @Prop({ required: true, index: true })
  uri: string;

  @Prop(mongoose.SchemaTypes.Mixed)
  payload: Record<string, any>;
}

export const VideoSchema = SchemaFactory.createForClass(Video);
VideoSchema.index({
  title: 1,
  order: 1,
  uri: 1,
});
