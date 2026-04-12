import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/db/prisma.module';
import { ProjectsController } from './project.controller';
import { ProjectService } from './projects.service';

@Module({
  imports: [PrismaModule],
  providers: [ProjectService],
  controllers: [ProjectsController],
  exports: [ProjectService],
})
export class ProjectModule {}
