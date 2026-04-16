/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Injectable, Res } from '@nestjs/common';
import { Model } from 'mongoose';
import { User } from '../../users/entities/user.entity';
import { UsersService } from '../../users/users.service';
import { HashingService } from '../hashing/hashing.service';
import { InjectModel } from '@nestjs/mongoose';
import { SignUpDto } from './dto/sign-up.dto/sign-up.dto';
import { v4 as uuidv4 } from 'uuid';

import { SignInDto } from './dto/sign-in.dto/sign-in.dto';
import { exhaustMap, from, take } from 'rxjs';
import { UserBoard } from 'src/cards/entities/board.entity';
import { CreateUserBoardDto } from 'src/cards/dto/create-userboard.dto';
import { KanbanBoard } from 'src/types/cards';

@Injectable()
export class AuthenticationService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
    @InjectModel(UserBoard.name)
    private readonly userBoardModel: Model<UserBoard>,

    private readonly hashingService: HashingService,
    private readonly usersService: UsersService,
  ) {}

  async signUp(signUpDto: SignUpDto, res: any) {
    const foundInDatabase: any = await this.userModel.find({
      email: signUpDto.email,
    });

    if (foundInDatabase[0]) {
      return res.status(400).send({
        status: 400,
        error: `пользователь с email ${signUpDto.email} уже существует - попробуйте зарегистрироваться с другим email`,
      });
    }
    let exitDto;
    this.userModel
      .create({
        id: uuidv4(),
        email: signUpDto.email,
        password: await this.hashingService.hash(signUpDto.password),
        name: signUpDto.name,
        contactPhone: signUpDto.contactPhone,
        role: signUpDto.role,
      })
      .then((created) => {
        exitDto = {
          id: created.id,
          email: created.email,
          name: created.name,
        };

        const startBoard: KanbanBoard = [
          {
            id: uuidv4(),
            title: 'To Do',
            cards: [],
            color: 'teal.5',
          },
          {
            id: uuidv4(),
            title: 'In Progress',
            cards: [],
            color: 'grape.5',
          },
          {
            id: uuidv4(),
            title: 'Done',
            cards: [],
            color: 'gray.7',
          },
        ];

        const userBoardStartDto: CreateUserBoardDto = {
          id: uuidv4(),
          userId: exitDto.id,
          kanbanboard: startBoard,
        };

        this.userBoardModel
          .create(userBoardStartDto)
          .then(() => res.status(200).send({ status: 200, exitDto }));
      });
  }

  async signIn(signInDto: SignInDto, req: Request, session, res) {
    const foundInDatabase: any = await this.userModel.find({
      email: signInDto.email,
    });
    if (!foundInDatabase[0]?.email) {
      return res.status(401).send({
        status: 401,
        error: `пользователь не  существует или неверный пароль`,
      });
    }

    const isEqual = await this.hashingService.compare(
      signInDto.password,
      foundInDatabase[0].password,
    );

    if (!isEqual) {
      res.status(401).send({
        status: 401,
        error: `пользователь не  существует или неверный пароль`,
      });
    } else {
      session.isAuthenticated = true;
      session.user = {
        email: foundInDatabase[0].email,
        name: foundInDatabase[0].name,
        id: foundInDatabase[0].id,
        role: foundInDatabase[0].role,
      };
      console.log(103, await session, await session.id);

      let exitDto: any;
      this.userBoardModel
        .findOne({ userId: await session.user.id })
        .then(async (userboard) => {
          console.log(9678, userboard, await session.user.id);

          exitDto = {
            email: await session.user.email,
            name: await session.user.name,
            contactPhone: await foundInDatabase[0].contactPhone,
            kanbanboard: userboard?.kanbanboard,
          };

          res.status(200).send({ status: 200, exitDto });
        });
    }
  }

  async logout(req, res) {
    await req.session.destroy((err) => {
      if (err) {
        res.status(520).send({
          status: 520,
          error: `попробуйте еще раз - возникла ошибка ${err}`,
        });
      } else {
        res.status(200).send({ status: 200, message: 'успех' });
      }
    });
  }
}
