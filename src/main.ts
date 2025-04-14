import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';
import { HttpExceptionFilter } from './filters/http-exception.filter';

// 加载环境变量
dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  // 启用 CORS
  app.enableCors({
    origin: true, // 允许所有来源，生产环境建议设置具体的域名
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
  });
  
  // 应用全局异常过滤器
  app.useGlobalFilters(new HttpExceptionFilter());
  
  await app.listen(3001);
}
bootstrap();
