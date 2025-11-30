import { NestFactory } from '@nestjs/core';
import { ValidationPipe, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { AllExceptionsFilter } from './common/filters/all-exceptions.filter';

async function bootstrap() {
  const logger = new Logger('Bootstrap');
  
  const app = await NestFactory.create(AppModule, {
    logger: ['error', 'warn', 'log', 'debug'],
  });

  const configService = app.get(ConfigService);
  const port = configService.get<number>('port') || 4000;
  const nodeEnv = configService.get<string>('nodeEnv');

  // Global prefix
  app.setGlobalPrefix('api');

  // CORS
  app.enableCors({
    origin: configService.get<string>('cors.origin'),
    credentials: configService.get<boolean>('cors.credentials'),
  });

  // Global validation pipe
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );

  // Global exception filter
  app.useGlobalFilters(new AllExceptionsFilter());

  // Swagger API Documentation
  if (nodeEnv !== 'production') {
    const config = new DocumentBuilder()
      .setTitle('CADT Compass API')
      .setDescription('Smart Campus Web Application API for CADT')
      .setVersion('1.0')
      .addBearerAuth()
      .addTag('Authentication', 'User authentication and profile management')
      .addTag('Map', 'Campus buildings and rooms')
      .addTag('Availability', 'Real-time room availability')
      .addTag('Events', 'Campus events calendar')
      .addTag('Feedback', 'User feedback and reports')
      .build();
    
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api/docs', app, document);
    
    logger.log(`📚 Swagger documentation available at http://localhost:${port}/api/docs`);
  }

  await app.listen(port);
  
  logger.log(`🚀 CADT Compass API running on http://localhost:${port}/api`);
  logger.log(`🌍 Environment: ${nodeEnv}`);
}

bootstrap();
