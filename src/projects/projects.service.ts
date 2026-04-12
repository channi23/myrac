import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/db/prisma.service';

type CreateProjectInput = {
  title: string;
  status: string;
};

type UpdateProjectInput = {
  title?: string;
  status?: string;
};

@Injectable()
export class ProjectService {
  constructor(private readonly prisma: PrismaService) {}

  create(data: CreateProjectInput) {
    return this.prisma.project.create({
      data,
    });
  }

  findAll() {
    return this.prisma.project.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  async findOne(id: string) {
    const project = await this.prisma.project.findUnique({
      where: { id },
    });

    if (!project) {
      throw new NotFoundException(`Project with id "${id}" not found`);
    }

    return project;
  }

  async update(id: string, data: UpdateProjectInput) {
    await this.findOne(id);

    return this.prisma.project.update({
      where: { id },
      data,
    });
  }

  async remove(id: string) {
    await this.findOne(id);

    return this.prisma.project.delete({
      where: { id },
    });
  }
}