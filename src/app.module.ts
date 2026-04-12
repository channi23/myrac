import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './db/prisma.module';
import { ProjectModule } from './projects/project.module';
import { LogsModule } from './logs/logs.module';
import { LogsController } from './logs/logs.controller';
import { LogsService } from './logs/logs.service';
import { PostsService } from './posts/posts.service';
import { PostsController } from './posts/posts.controller';
import { PostsModule } from './posts/posts.module';

@Module({
  imports: [PrismaModule, ProjectModule, LogsModule, PostsModule],
  controllers: [AppController, LogsController, PostsController],
  providers: [AppService, LogsService, PostsService],
})
export class AppModule {}
