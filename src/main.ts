import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { envs } from 'src/config';

const logger = new Logger('Auth-msv');
async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(AppModule, {
    transport: Transport.NATS,
    options: {
      servers: envs.natsServers,
    },
  });
  app.useGlobalPipes(new ValidationPipe({ forbidNonWhitelisted: true, whitelist: true }));

  await app.listen();
  logger.log(`Auth microservice running in port ${3021}`);
}
bootstrap();
