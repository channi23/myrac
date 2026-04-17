import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/db/prisma.service';


@Injectable()
export class LogsService {
    constructor(private readonly prisma: PrismaService) {}

    create(data: { content: string }) {
        return this.prisma.log.create({
            data,
        });
    }

    findAll() {
        return this.prisma.log.findMany({
            orderBy: { createdAt: 'desc' },
        });
    }

    async findOne(id: string) {
        const log = await this.prisma.log.findUnique({
            where: { id },
        });
        if (!log) {
            throw new NotFoundException(`Log with id "${id}" not found`);
        }
        return log;
    }

    async update(id: string, data: { content?: string }) {
        await this.findOne(id);
        return this.prisma.log.update({
            where: { id },
            data,
        });
    }

    async remove(id: string) {
        await this.findOne(id);
        return this.prisma.log.delete({
            where: { id },
        });
    }
}
