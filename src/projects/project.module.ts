import {Module} from '@nestjs/common';
import { ProjectController } from './project.controller';
import { ProjectService } from './projects.service';

@Module({
    providers:[ProjectService],
    controllers:[ProjectController],
    exports:[ProjectService],
})
export class ProjectModule{}
