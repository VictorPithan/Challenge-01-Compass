import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { UsersMapper } from './users-mapper.service';
import { AuthModule } from 'src/auth/auth.module';
import { Post } from 'src/posts/entities/post.entity';
import { Comment } from 'src/posts/entities/comment.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Post, Comment]), AuthModule],
  controllers: [UsersController],
  providers: [UsersService, UsersMapper],
  exports: [UsersService, UsersMapper]
})
export class UsersModule {}
