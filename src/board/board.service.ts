import { Injectable } from '@nestjs/common';
import { TokenService } from 'src/token/token.service';
import { User } from 'src/user/entities/user.entitiy';
import { BoardDto } from './dto/board.dto';
import { Board } from './entities/board.entitiy';
import { BoardRepository } from './repositories/board.repository';

@Injectable()
export class BoardService {
  constructor(
    private readonly tokenService: TokenService,
    private readonly boardRepository: BoardRepository,
  ) {}

  public async write(user: User, dto: BoardDto): Promise<void> {
    const board: undefined | Board = await this.boardRepository.findOne(
      dto.title,
    );

    const data = this.boardRepository.create(dto);
    data.createdAt = new Date();
    data.createdBy = user;
    console.log(data);
    this.boardRepository.save(dto);
  }
}
