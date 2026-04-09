import {Controller,Post,Body,Get,Param,Patch,Delete} from '@nestjs/common';
import { ProjectService} from './projects.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';

@Controller('projects')

export class ProjectController{
    constructor(private readonly service:ProjectService){}

    @Post()
    create(@Body() data:CreateProjectDto){
        return this.service.create(data);
    }

    @Get()
    findAll(){
        return this.service.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id:string){
        return this.service.findOne(id);
    }

    @Patch(':id')
    update(@Param('id') id:string, @Body() data:UpdateProjectDto){
        return this.service.update(id,data);
    }
    @Delete(':id')
    remove(@Param('id') id:string){
        return this.service.remove(id);
    }



}
