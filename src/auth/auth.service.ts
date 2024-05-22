import { HttpStatus, Injectable, Logger } from '@nestjs/common';
import { LoginUserDto } from './dto/login-user.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { RegisterUserDto } from './dto/register-user.dto';
import { RpcException } from '@nestjs/microservices';

import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  private logger = new Logger(AuthService.name);
  constructor(@InjectRepository(User) private readonly repository: Repository<User>) {}

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
        jwtToken: 'ABC',
      };
    } catch (error) {
      this.logger.error(error);
      throw new RpcException({ status: HttpStatus.BAD_REQUEST, message: 'No se ha podido crear el usuario' });
    }
  }

  findAll() {
    return `This action returns all auth`;
  }

  findOne(id: number) {
    return `This action returns a #${id} auth`;
  }

  update(id: number, updateAuthDto: UpdateAuthDto) {
    return `This action updates a #${id} auth`;
  }

  remove(id: number) {
    return `This action removes a #${id} auth`;
  }
}
