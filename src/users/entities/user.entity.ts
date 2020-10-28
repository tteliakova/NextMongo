import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';

import { SEX, ROLE } from '../types';

@Schema()
export class User extends mongoose.Document {
  @Prop({ required: true, index: true })
  name: string;

  @Prop({ required: true, index: true })
  email: string;

  @Prop({ required: true, index: true })
  phone: string;

  @Prop( { required: true, index: true })
  password: string;

  @Prop({ required: true, index: true })
  sex: SEX;

  @Prop({ index: true })
  role: ROLE;

  @Prop(mongoose.SchemaTypes.Mixed)
  payload: Record<string, any>;
}

export const UserSchema = SchemaFactory.createForClass(User);
UserSchema.index({
  name: 1,
  email: 1,
  phone: 1,
  password: 1,
  sex: 1,
  role: 1,
});
