import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Res,
  Req,
  Session,
  UseGuards,
} from '@nestjs/common';

import { SessionGuard } from '../iam/guards/session/session.guard';

import { CardsService } from './cards.service';
import { CreateUserBoardDto } from './dto/create-userboard.dto';
import { UpdateUserBoardDto } from './dto/update-userboard.dto';

@UseGuards(SessionGuard)
@Controller('api/userboard')
export class CardsController {
  constructor(private readonly cardsService: CardsService) {}
  @Post()
  async createUserboard(
    @Body() createUserboardDto: CreateUserBoardDto,
    @Res() res,
    @Req() req,
    @Session() session,
  ) {
    await this.cardsService.createUserboard(
      createUserboardDto,
      res,
      req,
      session,
    );
  }

  @Patch('update')
  async updateUserBoard(
    @Body() updateUserboardDto: UpdateUserBoardDto,
    @Res() res,
    @Req() req,
    @Session() session,
  ) {
    await this.cardsService.updateUserboard(
      updateUserboardDto,
      res,
      req,
      session,
    );
  }

  @Get('get')
  async getUserBoard(@Res() res, @Req() req, @Session() session) {
    await this.cardsService.getUserBoard(res, res, session);
  }

  /*
  constructor(private readonly cardsService: CardsService) {}

  @Post()
  create(@Body() createCardDto: CreateCardDto) {
    return this.cardsService.create(createCardDto);
  }

  @Get()
  findAll() {
    return this.cardsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.cardsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCardDto: UpdateCardDto) {
    return this.cardsService.update(+id, updateCardDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.cardsService.remove(+id);
  }
*/
}
