import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class User extends Document {
  @Prop()
  id?: string = '';
  @Prop()
  name: string;
  @Prop()
  email: string;
  @Prop()
  password: string; /// hashed
  @Prop()
  contactPhone?: string;
  @Prop()
  role?: string = 'client';
  
}

export const UserSchema = SchemaFactory.createForClass(User);
