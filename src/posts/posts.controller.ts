import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ApiBadRequestResponse, ApiBody, ApiCreatedResponse, ApiOkResponse, ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { PostsService } from './posts.service';
import {
  formatAjvErrors,
  validateBySchemaId,
} from '../common/validators/json-schema.validator';
import { createPostSchema, updatePostSchema } from './posts.schema';

@ApiTags('posts')
@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @ApiOperation({ summary: 'Create a post' })
  @ApiBody({ schema: createPostSchema as any })
  @ApiCreatedResponse({ description: 'Post created successfully' })
  @ApiBadRequestResponse({ description: 'Invalid post request body' })
  @Post()
  create(@Body() data: unknown) {
    const result = validateBySchemaId('CreatePost', data);

    if (!result.valid) {
      throw new BadRequestException({
        message: 'Post validation failed',
        errors: formatAjvErrors(result.errors),
      });
    }

    return this.postsService.create(data as { title: string; content: string });
  }

  @ApiOperation({ summary: 'Get all posts' })
  @ApiOkResponse({ description: 'Posts fetched successfully' })
  @Get()
  findAll() {
    return this.postsService.findAll();
  }

  @ApiOperation({ summary: 'Get one post by id' })
  @ApiParam({ name: 'id', type: String })
  @ApiOkResponse({ description: 'Post fetched successfully' })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.postsService.findOne(id);
  }

  @ApiOperation({ summary: 'Update a post' })
  @ApiParam({ name: 'id', type: String })
  @ApiBody({ schema: updatePostSchema as any })
  @ApiOkResponse({ description: 'Post updated successfully' })
  @ApiBadRequestResponse({ description: 'Invalid post update body' })
  @Patch(':id')
  update(@Param('id') id: string, @Body() data: unknown) {
    const result = validateBySchemaId('UpdatePost', data);

    if (!result.valid) {
      throw new BadRequestException({
        message: 'Post update validation failed',
        errors: formatAjvErrors(result.errors),
      });
    }

    return this.postsService.update(id, data as { title?: string; content?: string });
  }

  @ApiOperation({ summary: 'Delete a post' })
  @ApiParam({ name: 'id', type: String })
  @ApiOkResponse({ description: 'Post deleted successfully' })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.postsService.remove(id);
  }
}
