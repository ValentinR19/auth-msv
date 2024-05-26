import { HttpStatus, Injectable, Logger } from '@nestjs/common';
import { LoginUserDto } from './dto/login-user.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { User } from './models/classes/user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { RegisterUserDto } from './dto/register-user.dto';
import { RpcException } from '@nestjs/microservices';

import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './interfaces/jwt-payload.interface';
import { envs } from 'src/config';

@Injectable()
export class AuthService {
  private logger = new Logger(AuthService.name);
  constructor(
    @InjectRepository(User) private readonly repository: Repository<User>,
    private readonly jwtService: JwtService,
  ) {}

  async registerUser(createUserDto: RegisterUserDto) {
    const { email, name, password } = createUserDto;

    try {
      const user = await this.repository.findOne({ where: { email } });
      if (user) {
        throw new RpcException({ status: HttpStatus.UNPROCESSABLE_ENTITY, message: 'El email ya se encuentra registrado en la base de datos' });
      }
      createUserDto.password = bcrypt.hashSync(createUserDto.password, 10);
      const createdUser = await this.repository.save(createUserDto);

      const { password: __, ...rest } = createdUser;
      return {
        user: rest,
        jwtToken: await this.signJWT(rest),
      };
    } catch (error) {
      this.logger.error(error);
      throw new RpcException({ status: HttpStatus.BAD_REQUEST, message: 'No se ha podido crear el usuario' });
    }
  }

  async loginUser(loginUserDto: LoginUserDto) {
    const { email, password } = loginUserDto;

    try {
      const user = await this.repository.findOne({ where: { email } });
      if (!user) {
        throw new RpcException({ status: HttpStatus.BAD_REQUEST, message: 'User/Password not valid' });
      }
      const isPasswordValid = bcrypt.compareSync(password, user.password);

      if (!isPasswordValid) {
        throw new RpcException({ status: HttpStatus.BAD_GATEWAY, message: 'User/Password not valid' });
      }

      const { password: __, ...rest } = user;
      return {
        user: rest,
        jwtToken: await this.signJWT(rest),
      };
    } catch (error) {
      this.logger.error(error);
      throw new RpcException({ status: HttpStatus.BAD_REQUEST, message: 'No se ha podido crear el usuario' });
    }
  }

  async signJWT(payload: JwtPayload) {
    return this.jwtService.sign(payload);
  }

  async verifyToken(token: string) {
    try {
      const { sub, iat, exp, ...user } = this.jwtService.verify(token, { secret: envs.jwtSecret });

      return {
        user,
        token: await this.signJWT(user),
      };
    } catch (error) {
      throw new RpcException({ status: HttpStatus.UNAUTHORIZED, message: 'Invalid Token' });
    }
  }
}
