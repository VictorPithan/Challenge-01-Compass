import { Module } from '@nestjs/common';
import { PostsService } from './posts.service';
import { PostsController } from './posts.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Post } from './entities/post.entity';
import { PostsMapper } from './posts-mapper.service';
import { User } from 'src/users/entities/user.entity';
import { UsersService } from 'src/users/users.service';
import { AuthModule } from 'src/auth/auth.module';
import { Comment } from 'src/posts/entities/comment.entity';
import { UsersModule } from 'src/users/users.module';
import { CommentsMapper } from './comments-mapper.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Post, User, Comment]),
    AuthModule,
    UsersModule
  ],
  controllers: [PostsController],
  providers: [PostsService, PostsMapper, UsersService, CommentsMapper],
  exports: [PostsService, PostsMapper, CommentsMapper]
})
export class PostsModule {}
