import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const Token = createParamDecorator(
  (data: unknown, ctx: ExecutionContext): ParameterDecorator => {
    const requset = ctx.switchToHttp().getRequest();

    return requset.user;
  },
);
