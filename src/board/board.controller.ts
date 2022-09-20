import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { Token } from 'src/common/decorators/token.decorator';
import { AuthGuard } from 'src/common/guards/auth.guard';
import Response from 'src/common/response/response';
import { User } from 'src/user/entities/user.entitiy';
import { BoardService } from './board.service';
import { BoardDto } from './dto/board.dto';

@Controller('board')
export class BoardController {
  constructor(private readonly boardService: BoardService) {}

  @UseGuards(AuthGuard)
  @Post('/write')
  async write(@Token() user: User, @Body() dto: BoardDto): Promise<Response> {
    await this.boardService.write(user, dto);

    return Response.success('성공적으로 등록 되었습니다.');
  }
}
