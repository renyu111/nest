import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { UploadController } from './upload.controller';
import { UploadService } from './upload.service';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { existsSync, mkdirSync } from 'fs';
import { v4 as uuidv4 } from 'uuid';

@Module({
  imports: [
    MulterModule.register({
      dest: './public',
      storage: diskStorage({
        destination: (req, file, cb) => {
          // 根据文件类型确定存储目录
          const fileType = file.mimetype.split('/')[0];
          const uploadPath = `./public/${fileType}`;
          
          // 如果目录不存在，则创建
          if (!existsSync(uploadPath)) {
            mkdirSync(uploadPath, { recursive: true });
          }
          
          cb(null, uploadPath);
        },
        filename: (req, file, cb) => {
          // 使用 UUID 生成文件名
          const uuid = uuidv4();
          const ext = extname(file.originalname);
          cb(null, `${uuid}${ext}`);
        },
      }),
      fileFilter: (req, file, cb) => {
        // 这里可以添加文件类型验证
        cb(null, true);
      },
    }),
  ],
  controllers: [UploadController],
  providers: [UploadService],
})
export class UploadModule {} 