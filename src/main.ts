import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {cors:true});
  app.setGlobalPrefix('api');//Nuevo prefijo de la ruta raiz de la api
  await app.listen(3000); //Podemos cambiar el puerto
}
bootstrap();
