import {
  BadRequestException,
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { InfToken } from 'src/share/interfaces/InfToken';
import { validationNullORUndefined } from 'src/share/utils/validation.util';
import { TokenService } from 'src/token/token.service';
import { User } from 'src/user/entities/user.entitiy';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly userService: UserService,
    private readonly tokenService: TokenService,
  ) {}

  public async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest();

    const token: string = req.headers['authorization'];
    if (validationNullORUndefined(token)) {
      throw new BadRequestException('토큰이 없습니다');
    }

    const payload: InfToken = await this.tokenService.verifyToken(token);
    const user: User | undefined = await this.userService.getUserByUserID(
      payload.userEmail,
    );

    if (validationNullORUndefined(user)) {
      throw new UnauthorizedException('유저가 존재하지 않습니다.');
    }
    req.user = user;
    return true;
  }
}
