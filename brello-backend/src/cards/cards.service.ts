import { Injectable } from '@nestjs/common';
import { CreateUserBoardDto } from './dto/create-userboard.dto';
import { UpdateUserBoardDto } from './dto/update-userboard.dto';
import { InjectModel } from '@nestjs/mongoose';
import { UserBoard } from './entities/board.entity';
import { Model } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class CardsService {
  constructor(
    @InjectModel(UserBoard.name)
    private readonly userBoardModel: Model<UserBoard>,
  ) {}

  async createUserboard(
    createUserboardDto: CreateUserBoardDto,
    res: any,
    req: any,
    session: any,
  ) {
    const exitDto: CreateUserBoardDto = {
      id: uuidv4(),
      userId: await session.user.id,
      kanbanboard: createUserboardDto.kanbanboard,
    };

    const userboard = new this.userBoardModel(exitDto);
    userboard.save().then((data) => {
      console.log(-500, data);
      res.status(200).send({ status: 200, message: 'успех' });
    });
  }

  async updateUserboard(
    updateUserboardDto: UpdateUserBoardDto,
    res: any,
    req: any,
    session: any,
  ) {
    console.log(6633, updateUserboardDto);
    const exitDto = { kanbanboard: updateUserboardDto };
    this.userBoardModel
      .findOneAndUpdate(
        { userId: session.user.id },
        { $set: exitDto },
        { new: true },
      )
      .then((data) => {
        console.log(7788, data);
      });

    res.status(200).send({ status: 200, message: 'успех' });
  }

  async getUserBoard(res, req, session) {
    this.userBoardModel
      .findOne({ userId: session.user?.id })
      .then((userBoard) => {
        if (!userBoard) {
          res.status(404).send({ status: 404, message: 'доска не найдена' });
        } else {
          res.status(200).send({ status: 200, userBoard });
        }
      });
  }
  /*
  create(createCardDto: CreateCardDto) {
    return 'This action adds a new card';
  }

  findAll() {
    return `This action returns all cards`;
  }

  findOne(id: number) {
    return `This action returns a #${id} card`;
  }

  update(id: number, updateCardDto: UpdateCardDto) {
    return `This action updates a #${id} card`;
  }

  remove(id: number) {
    return `This action removes a #${id} card`;
  }
*/
}
