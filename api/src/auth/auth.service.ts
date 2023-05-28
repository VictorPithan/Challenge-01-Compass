import {
  BadRequestException,
  ForbiddenException,
  Inject,
  Injectable,
  NotFoundException
} from '@nestjs/common';

import { SignInDto } from './dto/sign-in.dto';

import * as bcrypt from 'bcrypt';

import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';
import { UsersMapper } from 'src/users/users-mapper.service';
import { PayloadTokenDto } from './dto/payload-token.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private readonly jwtService: JwtService,
    @Inject(UsersMapper) private usersMapper: UsersMapper
  ) {}

  async validateUser(email: string, password: string): Promise<any | null> {
    const user = await this.userRepository.findOne({
      where: {
        email
      }
    });

    if (user) {
      const passwordMatch = bcrypt.compareSync(password, user.password);

      if (passwordMatch) {
        delete user.password;
        return user;
      }
    }
    return null;
  }

  async login({ email, password }: SignInDto) {
    const validUser = await this.validateUser(email, password);

    if (!validUser) {
      return new BadRequestException('Invalid credentials');
    }

    const userData: any = { ...validUser };

    const user = this.usersMapper.toResponse(userData);

    const token = this.jwtService.sign(
      {
        sub: user?.id,
        email: user?.email,
        username: user?.username
      },
      { secret: process.env.JWT_SECRET }
    );

    return {
      jwt: token
    };
  }

  async getUserFromToken(token: string): Promise<PayloadTokenDto> {
    try {
      const payload: PayloadTokenDto = await this.jwtService.verifyAsync(
        token,
        {
          secret: process.env.JWT_SECRET
        }
      );
      return payload;
    } catch (e) {
      console.error('AuthService/getUserFromToken - ', { e });
      throw new ForbiddenException();
    }
  }
}
