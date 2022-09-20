import { flatten, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';

@Injectable()
export class MysqlConnectService implements TypeOrmOptionsFactory {
  constructor(private readonly configSerivce: ConfigService) {}

  createTypeOrmOptions(): TypeOrmModuleOptions {
    return {
      type: 'mysql',
      host: this.configSerivce.get<string>('DB_HOST'),
      port: this.configSerivce.get<number>('DB_PORT'),
      username: this.configSerivce.get<string>('DB_USER'),
      password: this.configSerivce.get('DB_PASSWORD'),
      database: this.configSerivce.get('DB_NAME'),
      entities: [__dirname + '/../**/**/*.entity{.ts,.js}'],
      synchronize: false,
      autoLoadEntities: true,
    };
  }
}
