import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import DataResponse from 'src/common/response/DataResponse';
import reMakeDto from './dto/remake.dto';
import { TokenService } from './token.service';

@Controller('token')
export class TokenController {
  constructor(private readonly tokenService: TokenService) {}

  // @HttpCode(200)
  // @Post('/refresh')
  // async remakeToken(@Body() dto: reMakeDto) {
  //   const token: string = await this.tokenService.remakeAccessToken(dto);
  //   return DataResponse.dataSuccesss('토큰이 재발급 되었습니다', token);
  // }
}
