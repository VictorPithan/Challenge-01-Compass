import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { JwtStrategy } from './strategies/jwt.strategy';
import { UsersService } from 'src/users/users.service';
import { UsersMapper } from 'src/users/users-mapper.service';
import * as dotenv from 'dotenv';
import { Post } from 'src/posts/entities/post.entity';
import { Comment } from 'src/posts/entities/comment.entity';

const env = process.env.NODE_ENV ? process.env.NODE_ENV : process.env.ENV;

dotenv.config({ path: `./.env.${env}` });

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Post, Comment]),
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '1d' }
    })
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy, JwtService, UsersService, UsersMapper],
  exports: [AuthService]
})
export class AuthModule {}
