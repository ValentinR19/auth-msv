import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { envs } from './config';

@Module({
  imports: [
    AuthModule,
    TypeOrmModule.forRoot({
      type: 'mongodb',
      url: 'mongodb+srv://root:root@auth-microservice-db.rzmdlaz.mongodb.net/Auth-DB',
      entities: ['dist/**/models/*/*{.entity.ts,.entity.js}'],
      synchronize: true,
      useUnifiedTopology: true,
      useNewUrlParser: true,
      logger: 'debug',
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
