import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { AuthService } from './auth.service';
import { LoginUserDto } from './dto/login-user.dto';
import { RegisterUserDto } from 'src/auth/dto/register-user.dto';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @MessagePattern('auth.register.user')
  authRegisterUser(@Payload() registerDto: RegisterUserDto) {
    return this.authService.registerUser(registerDto);
  }

  @MessagePattern('login.user')
  loginUser(@Payload() loginDto: LoginUserDto) {
    return this.authService.loginUser(loginDto);
  }

  @MessagePattern('auth.verify.user')
  verifyUser(@Payload() token: string) {
    return this.authService.verifyToken(token);
  }
}
