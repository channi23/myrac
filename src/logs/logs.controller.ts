import { BadRequestException, Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { ApiBadRequestResponse, ApiBody, ApiCreatedResponse, ApiOkResponse, ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { LogsService } from './logs.service';
import { formatAjvErrors, validateBySchemaId } from '../common/validators/json-schema.validator';
import { createLogSchema, updateLogSchema } from './logs.schema';

@ApiTags('logs')
@Controller('logs')
export class LogsController {
    constructor(private readonly logsService: LogsService) {}

    @ApiOperation({ summary: 'Create a log' })
    @ApiBody({ schema: createLogSchema as any })
    @ApiCreatedResponse({ description: 'Log created successfully' })
    @ApiBadRequestResponse({ description: 'Invalid log request body' })
    @Post()
    create(@Body() data:unknown){
        const result = validateBySchemaId('CreateLog',data);
        if(!result.valid){
            throw new BadRequestException({
                message: 'Log validation failed',
                errors: formatAjvErrors(result.errors),
            });
        }
        return this.logsService.create(data as {content:string});
    }

    @ApiOperation({ summary: 'Get all logs' })
    @ApiOkResponse({ description: 'Logs fetched successfully' })
    @Get()
    findMany(){
        return this.logsService.findAll();
    }

    @ApiOperation({ summary: 'Get one log by id' })
    @ApiParam({ name: 'id', type: String })
    @ApiOkResponse({ description: 'Log fetched successfully' })
    @Get(':id')
    findOne(@Param('id') id:string){
        return this.logsService.findOne(id);
    }

    @ApiOperation({ summary: 'Update a log' })
    @ApiParam({ name: 'id', type: String })
    @ApiBody({ schema: updateLogSchema as any })
    @ApiOkResponse({ description: 'Log updated successfully' })
    @ApiBadRequestResponse({ description: 'Invalid log update body' })
    @Patch(':id')
    update(@Param('id') id:string, @Body() data:unknown){
        const result = validateBySchemaId('UpdateLog',data);
        if(!result.valid){
            throw new BadRequestException({
                message: 'Log update validation failed',
                errors:formatAjvErrors(result.errors),
            });
        }
        return this.logsService.update(id,data as { content?: string });
    }

    @ApiOperation({ summary: 'Delete a log' })
    @ApiParam({ name: 'id', type: String })
    @ApiOkResponse({ description: 'Log deleted successfully' })
    @Delete(':id')
    delete(@Param('id') id:string){
        return this.logsService.remove(id);
    }
}
