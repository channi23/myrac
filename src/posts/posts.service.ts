import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/db/prisma.service';

@Injectable()
export class PostsService {
    constructor(private readonly prisma: PrismaService) {}

    create(data: { title: string; content: string }) {
        return this.prisma.post.create({
            data,
        });
    }

    findAll() {
        return this.prisma.post.findMany({
            orderBy: { createdAt: 'desc' },
        });
    }

    async findOne(id: string) {
        const post = await this.prisma.post.findUnique({
            where: { id },
        });
        if (!post) {
            throw new NotFoundException(`Post with id "${id}" not found`);
        }
        return post;
    }

    async update(id: string, data: { title?: string; content?: string }) {
        await this.findOne(id);
        return this.prisma.post.update({
            where: { id },
            data,
        });
    }

    async remove(id: string) {
        await this.findOne(id);
        return this.prisma.post.delete({
            where: { id },
        });
    }
}
