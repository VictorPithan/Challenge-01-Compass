import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Request as Req,
  Query,
  Res,
  Put
} from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/post/create-post.dto';
import { UpdatePostDto } from './dto/post/update-post.dto';
import { AuthGuard } from '@nestjs/passport';
import { Request, Response } from 'express';
import { AuthService } from 'src/auth/auth.service';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { PaginationDto } from 'src/common/pagination.dto';
import { ResponsePostDto } from './dto/post/response-post.dto';
import { ResponsePostListDto } from './dto/post/response-post-list.dto';
import { CreateCommentDto } from 'src/posts/dto/comment/create-comment.dto';
import { ResponseCommentListDto } from './dto/comment/response-comment-list.dto';
import { ResponseCommentDto } from './dto/comment/response-comment.dto';

@ApiTags('Posts')
@Controller({ path: 'posts', version: '1' })
@ApiBearerAuth('jwt-token')
export class PostsController {
  constructor(
    private readonly postsService: PostsService,
    private readonly authService: AuthService
  ) {}

  @Post()
  @ApiResponse({
    status: 201,
    description: 'Infos posts created',
    type: ResponsePostDto
  })
  @UseGuards(AuthGuard('jwt'))
  async create(@Req() req: Request, @Body() createPostDto: CreatePostDto) {
    const token = req.headers.authorization?.split(' ')[1];
    const tokenPayload = await this.authService.getUserFromToken(token);

    return this.postsService.create(createPostDto, tokenPayload);
  }

  @Get()
  @UseGuards(AuthGuard('jwt'))
  @ApiResponse({
    status: 200,
    description: 'Show all posts',
    type: ResponsePostListDto
  })
  findAll(@Query() pagination: PaginationDto): Promise<ResponsePostListDto> {
    return this.postsService.findAll(pagination);
  }

  @Get(':id')
  @UseGuards(AuthGuard('jwt'))
  @ApiResponse({
    status: 200,
    description: 'Infos post',
    type: ResponsePostDto
  })
  @ApiResponse({
    status: 404,
    description: 'Post not found'
  })
  findOne(@Param('id') id: string): Promise<ResponsePostDto> {
    return this.postsService.findOne(id);
  }

  @Put(':id')
  @ApiResponse({
    status: 200,
    description: 'Infos post updated',
    type: ResponsePostDto
  })
  @ApiResponse({
    status: 404,
    description: 'Post not found'
  })
  @UseGuards(AuthGuard('jwt'))
  update(@Param('id') id: string, @Body() updatePostDto: UpdatePostDto) {
    return this.postsService.update(id, updatePostDto);
  }

  @Delete(':id')
  @UseGuards(AuthGuard('jwt'))
  @ApiResponse({
    status: 204,
    description: 'Post successfully deleted'
  })
  @ApiResponse({
    status: 400,
    description: 'User is not the author of the post'
  })
  @ApiResponse({
    status: 404,
    description: 'Post not found'
  })
  async remove(
    @Param('id') id: string,
    @Res() res: Response,
    @Req() req: Request
  ): Promise<Response> {
    const token = req.headers.authorization?.split(' ')[1];
    const tokenPayload = await this.authService.getUserFromToken(token);

    await this.postsService.remove(id, tokenPayload);
    return res.status(204).send();
  }

  @Post(':post_id/comments')
  @UseGuards(AuthGuard('jwt'))
  @ApiResponse({
    status: 201,
    description: 'Infos comment created',
    type: ResponseCommentDto
  })
  async addComment(
    @Req() req: Request,
    @Body() createComment: CreateCommentDto,
    @Param('post_id') postId: string
  ) {
    const token = req.headers.authorization?.split(' ')[1];
    const tokenPayload = await this.authService.getUserFromToken(token);

    return this.postsService.addComment(createComment, tokenPayload, postId);
  }

  @Get(':id/comments')
  @UseGuards(AuthGuard('jwt'))
  @ApiResponse({
    status: 200,
    description: 'Show all comments by post',
    type: ResponseCommentListDto
  })
  @ApiResponse({
    status: 404,
    description: 'Post not found'
  })
  findAllComments(
    @Query() pagination: PaginationDto,
    @Param('id') id: string
  ): Promise<ResponseCommentListDto> {
    return this.postsService.finAllComments(id, pagination);
  }

  @Get(':id/comments/:comment_id')
  @ApiResponse({
    status: 200,
    description: 'Comment details',
    type: ResponseCommentListDto
  })
  @ApiResponse({
    status: 404,
    description: 'Post or comment not found'
  })
  @UseGuards(AuthGuard('jwt'))
  findOneComment(
    @Param('id') id: string,
    @Param('comment_id') commentId: string
  ): Promise<ResponseCommentDto> {
    return this.postsService.findOneComment(id, commentId);
  }

  @Delete(':id/comments/:comment_id')
  @UseGuards(AuthGuard('jwt'))
  @ApiResponse({
    status: 204,
    description: 'Comment successfully deleted'
  })
  @ApiResponse({
    status: 400,
    description: 'User is not the author of the comment'
  })
  @ApiResponse({
    status: 404,
    description: 'Post or comment not found'
  })
  async removeComment(
    @Param('id') id: string,
    @Param('comment_id') commentId: string,
    @Res() res: Response,
    @Req() req: Request
  ): Promise<Response> {
    const token = req.headers.authorization?.split(' ')[1];
    const tokenPayload = await this.authService.getUserFromToken(token);

    await this.postsService.removeComment(id, commentId, tokenPayload);
    return res.status(204).send();
  }
}
