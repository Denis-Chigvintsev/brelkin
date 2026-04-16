import {
  IsBoolean,
  IsDate,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import type { KanbanBoard } from '../../types/cards';
export class UpdateUserBoardDto {
  @ValidateNested()
  kanbanboard: KanbanBoard;
}
