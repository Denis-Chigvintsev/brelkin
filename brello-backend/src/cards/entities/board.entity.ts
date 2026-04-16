import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

import { HydratedDocument } from 'mongoose';

export type BoardDocument = HydratedDocument<UserBoard>;

import type { KanbanBoard } from '../../types/cards';

@Schema()
export class UserBoard {
  @Prop()
  id?: string = '';
  @Prop()
  userId: string;
  @Prop()
  kanbanboard: KanbanBoard;
}

export const UserBoardSchema = SchemaFactory.createForClass(UserBoard);
