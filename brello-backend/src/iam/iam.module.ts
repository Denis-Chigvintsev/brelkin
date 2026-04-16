import { Module } from '@nestjs/common';
import { HashingService } from './hashing/hashing.service';
import { BcryptService } from './hashing/bcrypt.service';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from '../users/entities/user.entity';
import { UsersModule } from '../users/users.module';
import { AuthenticationController } from './authentication/authentication.controller';
import { AuthenticationService } from './authentication/authentication.service';
import { UserBoard, UserBoardSchema } from '../cards/entities/board.entity';
import { CardsModule } from 'src/cards/cards.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: User.name,
        schema: UserSchema,
      },
      { name: UserBoard.name, schema: UserBoardSchema },
    ]),
    UsersModule,
    CardsModule,
  ],
  providers: [
    { provide: HashingService, useClass: BcryptService },
    AuthenticationService,

    //{
    // provide: APP_GUARD,
    // useClass: SessionGuard,
    //},
  ],
  controllers: [AuthenticationController],
})
export class IamModule {}
