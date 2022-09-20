import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MysqlConnectService } from './mysqlConnect.service';

@Module({
  providers: [MysqlConnectService],
})
export class DatabaseModule {}
