import { IsEmail, IsString, IsStrongPassword } from 'class-validator';

export class LoginUserDto {
  @IsEmail()
  @IsString()
  email: string;

  @IsString()
  @IsStrongPassword({ minLength: 8 })
  password: string;
}
