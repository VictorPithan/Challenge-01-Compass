import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInDto } from './dto/sign-in.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Auth')
@Controller({ version: '1' })
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/login')
  login(@Body() signInDto: SignInDto) {
    return this.authService.login(signInDto);
  }
}
