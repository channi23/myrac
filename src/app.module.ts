import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './db/prisma.module';
import { ProjectModule } from './projects/project.module';
import { LogsModule } from './logs/logs.module';
import { PostsModule } from './posts/posts.module';

@Module({
  imports: [PrismaModule, ProjectModule, LogsModule, PostsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
