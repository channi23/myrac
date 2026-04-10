import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/db/prisma.service';
import { CreateLogDto } from './dto/create-log.dto';
import { UpdateLogDto } from './dto/update-log.dto';


@Injectable()
export class LogsService {
    constructor(private readonly prisma:PrismaService){}

    create(data:CreateLogDto){
        return this.prisma.logs.create({
            data,
        });
    }

    findAll(){
        return this.prisma.logs.findMany({
            orderBy:{createdAt:'desc'},
        });
    }

    async findOne(id:string){
        const log = await this.prisma.logs.findUnique({
            where:{id},
        });
        if(!log){
            throw new NotFoundException(`Log with ${id} not found`);
        }
        return log;
    }

   async  update(id:string,data:UpdateLogDto){
        await this.findOne(id);
        return this.prisma.logs.update({
            where:{id},
            data,
        });
    }

    async remove(id:string){
        await this.findOne(id);
        return this.prisma.logs.delete({
            where:{id},
        });
    }

}
