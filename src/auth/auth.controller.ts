import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { AuthService } from './auth.service';
import { LoginUserDto } from './dto/login-user.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { RegisterUserDto } from 'src/auth/dto/register-user.dto';
import { date } from 'joi';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @MessagePattern('auth.register.user')
  authRegisterUser(@Payload() registerDto: RegisterUserDto) {
    return { message: 'Usuario Registrado', success: true, data: registerDto };
  }

  @MessagePattern('login.user')
  loginUser(@Payload() loginDto: LoginUserDto) {
    return { message: 'Usuario Logueado', success: true };
  }

  @MessagePattern('verify.user')
  verifyUser(@Payload() id: number) {
    return { message: 'El usuario es valido', success: true };
  }
}
