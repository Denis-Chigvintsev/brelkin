import {
  IsBoolean,
  IsDate,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import type { KanbanBoard } from '../../types/cards';
export class CreateUserBoardDto {
  @IsOptional()
  @IsString()
  id?: string = '';

  @IsOptional()
  @IsString()
  userId: string = '';

  @ValidateNested()
  kanbanboard: KanbanBoard;
}
