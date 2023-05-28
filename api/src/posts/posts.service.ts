import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException
} from '@nestjs/common';
import { CreatePostDto } from './dto/post/create-post.dto';
import { UpdatePostDto } from './dto/post/update-post.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Post } from './entities/post.entity';
import { Repository } from 'typeorm';
import { PostsMapper } from './posts-mapper.service';
import * as uuid from 'uuid';
import { PayloadTokenDto } from 'src/auth/dto/payload-token.dto';
import { UsersService } from 'src/users/users.service';
import { PaginationDto } from 'src/common/pagination.dto';
import { ResponsePostListDto } from './dto/post/response-post-list.dto';
import { ResponsePostDto } from './dto/post/response-post.dto';
import { CreateCommentDto } from 'src/posts/dto/comment/create-comment.dto';
import { Comment } from 'src/posts/entities/comment.entity';
import { CommentsMapper } from './comments-mapper.service';
import { ResponseCommentListDto } from './dto/comment/response-comment-list.dto';
import { ResponseCommentDto } from './dto/comment/response-comment.dto';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(Post)
    private postsRepository: Repository<Post>,
    @InjectRepository(Comment)
    private commentsRepository: Repository<Comment>,
    @Inject(PostsMapper) private postsMapper: PostsMapper,
    @Inject(CommentsMapper) private commentsMapper: CommentsMapper,
    @Inject(UsersService) private usersService: UsersService
  ) {}

  async create(createPostDto: CreatePostDto, payloadToken: PayloadTokenDto) {
    const author = await this.usersService.getUserOrException(payloadToken.sub);
    const post = this.postsRepository.create({
      id: uuid.v4(),
      ...createPostDto,
      user: author
    });

    const response = await this.postsRepository.save(post);

    return this.postsMapper.toResponse(response);
  }

  async findAll(paginationDto: PaginationDto): Promise<ResponsePostListDto> {
    const pagination: PaginationDto = {
      limit: paginationDto?.limit || 10,
      page: paginationDto?.page || 1
    };

    const take = pagination.limit;
    const skip = (pagination.page - 1) * take;

    const [data, total] = await this.postsRepository
      .createQueryBuilder('posts')
      .leftJoinAndSelect('posts.user', 'user')
      .take(take)
      .skip(skip)
      .getManyAndCount();

    const response = data.map((post) => this.postsMapper.toResponse(post));

    return {
      posts: [...response],
      total
    };
  }

  async findOne(id: string): Promise<ResponsePostDto> {
    const post = await this.getPostOrException(id);

    if (!post) {
      throw new NotFoundException('Post not found');
    }

    const response = this.postsMapper.toResponse(post);

    return response;
  }

  async update(id: string, updatePostDto: UpdatePostDto) {
    const post = await this.getPostOrException(id);

    const postUpdated = this.postsRepository.create({
      ...post,
      ...updatePostDto
    });

    const response = await this.postsRepository.save(postUpdated);

    return this.postsMapper.toResponse(response);
  }

  async remove(id: string, payloadToken: PayloadTokenDto) {
    const post = await this.getPostOrException(id);

    await this.commentsRepository.remove(post.comments);

    if (!post) {
      throw new NotFoundException('Post not found');
    }

    const author = await this.usersService.getUserOrException(payloadToken.sub);

    if (author.id !== post.user.id) {
      throw new BadRequestException('User is not the author of the post');
    }
    await this.postsRepository.delete(post.id);
  }

  async addComment(
    createComment: CreateCommentDto,
    payloadToken: PayloadTokenDto,
    postId: string
  ) {
    const post = await this.getPostOrException(postId);
    const author = await this.usersService.getUserOrException(payloadToken.sub);

    const comment = this.commentsRepository.create({
      id: uuid.v4(),
      ...createComment,
      post,
      user: author
    });

    const response = await this.commentsRepository.save(comment);

    return this.commentsMapper.toResponse(response);
  }

  async findOneComment(
    id: string,
    commentId: string
  ): Promise<ResponseCommentDto> {
    await this.getPostOrException(id);

    const comment = await this.commentsRepository.findOne({
      where: {
        id: commentId
      },
      relations: ['post', 'user']
    });

    if (!comment) {
      throw new NotFoundException('Comment not found');
    }

    return this.commentsMapper.toResponse(comment);
  }

  async finAllComments(
    postId: string,
    paginationDto: PaginationDto
  ): Promise<ResponseCommentListDto> {
    const pagination: PaginationDto = {
      limit: paginationDto?.limit || 10,
      page: paginationDto?.page || 1
    };

    const take = pagination.limit;
    const skip = (pagination.page - 1) * take;

    const [data, total] = await this.commentsRepository
      .createQueryBuilder('comments')
      .leftJoinAndSelect('comments.user', 'user')
      .leftJoinAndSelect('comments.post', 'post')
      .where('comments.post_id = :id')
      .setParameter('id', postId)
      .take(take)
      .skip(skip)
      .getManyAndCount();

    const response = data.map((comment) =>
      this.commentsMapper.toResponse(comment)
    );

    return {
      comments: [...response],
      total
    };
  }

  async removeComment(
    id: string,
    commentId: string,
    payloadToken: PayloadTokenDto
  ) {
    await this.getPostOrException(id);
    const comment = await this.getCommentOrException(commentId);

    const author = await this.usersService.getUserOrException(payloadToken.sub);

    if (author.id !== comment.user.id) {
      throw new BadRequestException('User is not the author of the Comment');
    }

    await this.commentsRepository.delete(comment.id);
  }

  async getPostOrException(id: string): Promise<Post> {
    const post = await this.postsRepository.findOne({
      where: {
        id
      },
      relations: ['user', 'comments']
    });

    if (!post) {
      throw new NotFoundException('Post not found');
    }

    return post;
  }

  async getCommentOrException(id: string): Promise<Comment> {
    const comment = await this.commentsRepository.findOne({
      where: {
        id
      }
    });

    if (!comment) {
      throw new NotFoundException('Comment not found');
    }

    return comment;
  }
}
