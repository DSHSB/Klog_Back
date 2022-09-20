import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Put,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Token } from 'src/common/decorators/token.decorator';
import { AuthGuard } from 'src/common/guards/auth.guard';
import DataResponse from 'src/common/response/DataResponse';
import Response from 'src/common/response/response';
import { loginDto } from './dto/login.dto';
import { UserDto } from './dto/user.dto';
import { User } from './entities/user.entitiy';
import { InfLoginResponse } from './responses/login.response';
import { UserService } from './user.service';

@Controller('')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('register')
  async register(@Body() dto: UserDto): Promise<Response> {
    await this.userService.register(dto);

    return Response.success('회원가입 성공');
  }

  @Post('login')
  async login(@Body() dto: loginDto): Promise<DataResponse<InfLoginResponse>> {
    const loginRes: InfLoginResponse = await this.userService.login(dto);

    return DataResponse.dataSuccesss('로그인 성공', loginRes);
  }

  @UseGuards(AuthGuard)
  @Put('setting')
  async setting(@Token() user: User, @Body() dto: UserDto): Promise<Response> {
    await this.userService.setting(user, dto);

    return Response.success('수정 성공');
  }

  @UseGuards(AuthGuard)
  @Delete('delete')
  async delete(@Token() user: User): Promise<Response> {
    await this.userService.delete(user);

    return Response.success('계정 탈퇴 성공');
  }

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  uplaodFile(@UploadedFile() file: Express.Multer.File) {
    console.log(file);
  }
}
