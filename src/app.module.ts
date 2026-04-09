import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './db/prisma.module';
import { ProjectModule } from './projects/project.module';

@Module({
  imports: [PrismaModule, ProjectModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
