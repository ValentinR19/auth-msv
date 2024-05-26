import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { envs } from './config';

@Module({
  imports: [
    AuthModule,
    TypeOrmModule.forRoot({
      type: 'mongodb',
      url: envs.databaseUrl,
      entities: ['dist/**/models/*/*{.entity.ts,.entity.js}'],
      synchronize: true,
      useUnifiedTopology: true,
      useNewUrlParser: true,
      logging: ['query', 'error'],
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
