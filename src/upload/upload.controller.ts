import { Controller, Post, Get, UseInterceptors, UploadedFile, HttpCode, HttpStatus, UseGuards } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { UploadService } from './upload.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { FileInfo } from './interfaces/file-info.interface';

@Controller('upload')
@UseGuards(JwtAuthGuard)
export class UploadController {
  constructor(private readonly uploadService: UploadService) {}

  @Post()
  @HttpCode(HttpStatus.OK)
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(@UploadedFile() file: Express.Multer.File) {
    const fileType = file.mimetype.split('/')[0];
    const fileUrl = this.uploadService.getFileUrl(file.filename, fileType);
    
    return {
      originalname: file.originalname,
      filename: file.filename,
      fileType,
      url: fileUrl,
      size: file.size,
    };
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  async getAllFiles(): Promise<FileInfo[]> {
    return this.uploadService.getAllFiles();
  }
} 