import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import * as bodyParser from 'body-parser';

async function bootstrap() {
  // Crear una aplicación de tipo NestExpressApplication para usar las funciones de NestJS con Express
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  // Habilitar CORS
  app.enableCors({
    origin: 'http://localhost:4200',  // Cambia esto según el origen de tu frontend
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
  });

    // Configura body-parser para aumentar el límite de tamaño de carga
    app.use(bodyParser.json({ limit: '10mb' })); // Ajusta el tamaño según tus necesidades
    app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }));

  // Pipes de validación global
  app.useGlobalPipes(new ValidationPipe());

  // Servir archivos estáticos desde la carpeta 'public'
  app.useStaticAssets(join(__dirname, '..', 'public'), {
    prefix: '/',  // Cambiar el prefijo para que se acceda a las imágenes directamente
  });

  await app.listen(3000);
}
bootstrap();