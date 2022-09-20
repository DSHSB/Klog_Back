import {
  ForbiddenException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { AuthGuard } from 'src/common/guards/auth.guard';
import { validationNullORUndefined } from 'src/share/utils/validation.util';
import { TokenService } from 'src/token/token.service';
import { loginDto } from './dto/login.dto';
import { UserDto } from './dto/user.dto';
import { User } from './entities/user.entitiy';
import { UserRepository } from './repositories/user.repository';
import { InfLoginResponse } from './responses/login.response';
import { UserController } from './user.controller';

@Injectable()
export class UserService {
  constructor(
    private readonly tokenService: TokenService,
    private readonly userRepository: UserRepository,
  ) {}

  public async register(dto: UserDto): Promise<void> {
    const userFindId: undefined | User = await this.userRepository.findOne(
      dto.id,
    );
    const userFindEmail: undefined | User = await this.userRepository.findOne({
      where: { email: dto.email },
    });

    if (!validationNullORUndefined(userFindId)) {
      throw new ForbiddenException('이미 존재하는 아이디입니다.');
    }

    if (!validationNullORUndefined(userFindEmail)) {
      throw new ForbiddenException('이미 존재하는 이메일입니다.');
    }

    dto.password = await bcrypt.hash(dto.password, 5);

    await this.userRepository.save(dto);
  }

  public async login(dto: loginDto): Promise<InfLoginResponse> {
    const user: undefined | User = await this.userRepository.findOne({
      where: { id: dto.id },
    });

    if (validationNullORUndefined(user)) {
      throw new UnauthorizedException('id 또는 password가 일치 하지 않습니다.');
    }

    if (!(await bcrypt.compare(dto.password, user.password))) {
      throw new UnauthorizedException('id 또는 password가 일치 하지 않습니다.');
    }

    const token: string = this.tokenService.makeAccessToken(user.id);

    return {
      user,
      token,
    };
  }

  public async setting(user: User, dto: UserDto): Promise<void> {
    const getUser: undefined | User = await this.userRepository.findOne(
      user.id,
    );

    if (validationNullORUndefined(getUser)) {
      throw new NotFoundException('알 수 없는 에러.');
    }

    this.userRepository.merge(getUser, dto);

    await this.userRepository.save(getUser);
  }

  public async delete(user: User): Promise<void> {
    await this.userRepository.delete(user.id);
  }

  public async getUserByUserID(userEmail: string): Promise<User> {
    const user: undefined | User = await this.userRepository.findOne({
      where: { id: userEmail },
    });

    if (validationNullORUndefined(user)) {
      throw new NotFoundException('유저가 없습니다.');
    }

    return user;
  }
}
