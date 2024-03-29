import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import * as uuid from 'uuid';
import * as bcrypt from 'bcrypt';
import { UsersMapper } from './users-mapper.service';
import { PaginationDto } from 'src/common/pagination.dto';
import { ResponseUserListDto } from './dto/response-user-list.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ResponseUserDto } from './dto/response-user.dto';
import { Post } from 'src/posts/entities/post.entity';
import { Comment } from 'src/posts/entities/comment.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    @InjectRepository(Post)
    private postsRepository: Repository<Post>,
    @InjectRepository(Comment)
    private commentsRepository: Repository<Comment>,
    @Inject(UsersMapper) private usersMapper: UsersMapper
  ) {}

  async create(createUserDto: CreateUserDto) {
    const emailExist = await this.usersRepository.findOne({
      where: {
        email: createUserDto.email
      }
    });
    if (emailExist) {
      throw new BadRequestException('Email already exists');
    }
    const user = this.usersRepository.create({
      id: uuid.v4(),
      ...createUserDto,
      password: bcrypt.hashSync(createUserDto.password, 10)
    });

    const response = await this.usersRepository.save(user);

    return this.usersMapper.toResponse(response);
  }

  async findAll(paginationDto: PaginationDto): Promise<ResponseUserListDto> {
    const pagination: PaginationDto = {
      limit: paginationDto?.limit || 50,
      page: paginationDto?.page || 1
    };

    const take = pagination.limit;
    const skip = (pagination.page - 1) * take;

    const [data, total] = await this.usersRepository
      .createQueryBuilder('users')
      .take(take)
      .skip(skip)
      .getManyAndCount();

    const response = data.map((user) => this.usersMapper.toResponse(user));

    return {
      users: [...response],
      total
    };
  }

  async findOne(id: string): Promise<ResponseUserDto> {
    const user = await this.getUserOrException(id);

    const response = this.usersMapper.toResponse(user);

    return response;
  }

  async update(
    id: string,
    updateUserDto: UpdateUserDto
  ): Promise<ResponseUserDto> {
    const user = await this.getUserOrException(id);
    const pass = updateUserDto.password
      ? bcrypt.hashSync(updateUserDto.password, 10)
      : user.password;

    const userUpdated = this.usersRepository.create({
      ...user,
      ...updateUserDto,
      password: pass
    });

    const response = await this.usersRepository.save(userUpdated);

    return this.usersMapper.toResponse(response);
  }

  async delete(id: string) {
    const user = await this.usersRepository.findOne({
      where: {
        id
      },
      relations: ['posts', 'posts.comments']
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }
    const posts = user.posts;

    // MANUALY CASCADE
    posts.map(async (post) => {
      await this.commentsRepository.remove(post.comments);
      await this.postsRepository.delete(post.id);
    });

    await this.usersRepository.delete(user.id);
  }

  async getUserOrException(id: string): Promise<User> {
    const user = await this.usersRepository.findOne({
      where: {
        id
      },
      relations: ['posts']
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }
}
