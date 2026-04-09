import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/db/prisma.module';
import { ProjectController } from './project.controller';
import { ProjectService } from './projects.service';

@Module({
  imports: [PrismaModule],
  providers: [ProjectService],
  controllers: [ProjectController],
  exports: [ProjectService],
})
export class ProjectModule {}
