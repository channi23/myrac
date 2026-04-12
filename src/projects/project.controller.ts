import { Controller, Post, Body, Get, Param, Patch, Delete, BadRequestException } from '@nestjs/common';
import { ApiBadRequestResponse, ApiBody, ApiCreatedResponse, ApiOkResponse, ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { ProjectService } from './projects.service';
import { formatAjvErrors, validateBySchemaId } from '../common/validators/json-schema.validator';
import { createProjectSchema, updateProjectSchema } from './project.schema';

@ApiTags('projects')
@Controller('projects')

export class ProjectsController {
    constructor(private readonly projectsService: ProjectService) {}

    @ApiOperation({ summary: 'Create a project' })
    @ApiBody({ schema: createProjectSchema })
    @ApiCreatedResponse({ description: 'Project created successfully' })
    @ApiBadRequestResponse({ description: 'Invalid project request body' })
    @Post()
    create(@Body() data: unknown) {
        const result = validateBySchemaId('CreateProject', data);
        if (!result.valid) {
            throw new BadRequestException({
                message: 'Project validation failed',
                errors: formatAjvErrors(result.errors),
            });
        }
        return this.projectsService.create(data as { title: string; status: string });
    }

    @ApiOperation({ summary: 'Get all projects' })
    @ApiOkResponse({ description: 'Projects fetched successfully' })
    @Get()
    findAll() {
        return this.projectsService.findAll();
    }

    @ApiOperation({ summary: 'Get one project by id' })
    @ApiParam({ name: 'id', type: String })
    @ApiOkResponse({ description: 'Project fetched successfully' })
    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.projectsService.findOne(id);
    }

    @ApiOperation({ summary: 'Update a project' })
    @ApiParam({ name: 'id', type: String })
    @ApiBody({ schema: updateProjectSchema })
    @ApiOkResponse({ description: 'Project updated successfully' })
    @ApiBadRequestResponse({ description: 'Invalid project update body' })
    @Patch(':id')
    update(@Param('id') id: string, @Body() data: unknown) {
        const result = validateBySchemaId('UpdateProject', data);
        if (!result.valid) {
            throw new BadRequestException({
                message: 'Project update validation failed',
                errors: formatAjvErrors(result.errors),
            });
        }
        return this.projectsService.update(id, data as { title?: string; status?: string });
    }
    @ApiOperation({ summary: 'Delete a project' })
    @ApiParam({ name: 'id', type: String })
    @ApiOkResponse({ description: 'Project deleted successfully' })
    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.projectsService.remove(id);
    }
}
