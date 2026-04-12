import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/db/prisma.service';


@Injectable()
export class LogsService {
    constructor(private readonly prisma:PrismaService){}

    create(data: { content: string }){
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

   async update(id: string, data: { content?: string }) {
        try {
            return await this.prisma.logs.update({
                where: { id },
                data,
            });
        } catch (error) {
            throw new NotFoundException(`Log with id "${id}" not found`);
        }
    }

    async remove(id:string){
        try {
            return await this.prisma.logs.delete({
                where: { id },
            });
        } catch (error) {
            throw new NotFoundException(`Log with id "${id}" not found`);
        }
    }

}
