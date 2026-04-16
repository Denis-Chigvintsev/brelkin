import { Module } from '@nestjs/common';
import { CardsService } from './cards.service';
import { CardsController } from './cards.controller';
import { UserBoard, UserBoardSchema } from './entities/board.entity';
import { MongooseModule } from '@nestjs/mongoose';

@Module({

imports: [
    MongooseModule.forFeature([
      {
        name: UserBoard.name,
        schema: UserBoardSchema,
      },
    ]),
  ],






  controllers: [CardsController],
  providers: [CardsService],
})
export class CardsModule {}
