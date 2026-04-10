import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './db/prisma.module';
import { ProjectModule } from './projects/project.module';
import { LogsModule } from './logs/logs.module';
import { LogsController } from './logs/logs.controller';
import { LogsService } from './logs/logs.service';

@Module({
  imports: [PrismaModule, ProjectModule, LogsModule],
  controllers: [AppController, LogsController],
  providers: [AppService, LogsService],
})
export class AppModule {}
