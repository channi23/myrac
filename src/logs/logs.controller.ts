import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { LogsService } from './logs.service';
import { CreateLogDto } from './dto/create-log.dto';
import { UpdateLogDto } from './dto/update-log.dto';

@Controller('logs')
export class LogsController {
    constructor(private readonly service:LogsService){}

    @Post()
    create(@Body() data:CreateLogDto){
        return this.service.create(data);
    }

    @Get()
    findMany(){
        return this.service.findAll();
    }
    @Get(':id')
    findOne(@Param('id') id:string){
        return this.service.findOne(id);
    }

    @Patch(':id')
    update(@Param('id') id:string, @Body() data:UpdateLogDto){
        return this.service.update(id,data);
    }

    @Delete(':id')
    delete(@Param('id') id:string){
        return this.service.remove(id);
    }

}
