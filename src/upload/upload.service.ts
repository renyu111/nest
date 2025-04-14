import { Injectable, NotFoundException } from '@nestjs/common';
import { join } from 'path';
import { readdirSync, statSync, unlinkSync, existsSync } from 'fs';
import { FileInfo } from './interfaces/file-info.interface';

@Injectable()
export class UploadService {
  getFileUrl(filename: string, fileType: string): string {
    return `/public/${fileType}/${filename}`;
  }

  getAllFiles(): FileInfo[] {
    const publicDir = join(process.cwd(), 'public');
    const fileTypes = readdirSync(publicDir);
    const files: FileInfo[] = [];

    fileTypes.forEach(type => {
      const typePath = join(publicDir, type);
      const typeStats = statSync(typePath);
      
      if (typeStats.isDirectory()) {
        const fileNames = readdirSync(typePath);
        fileNames.forEach(fileName => {
          const filePath = join(typePath, fileName);
          const fileStats = statSync(filePath);
          
          files.push({
            fileName,
            fileType: type,
            url: `/public/${type}/${fileName}`,
            size: fileStats.size,
            createdAt: fileStats.birthtime,
            updatedAt: fileStats.mtime,
          });
        });
      }
    });

    return files;
  }

  deleteFile(fileName: string): void {
    // 在所有文件类型目录中查找文件
    const publicDir = join(process.cwd(), 'public');
    const fileTypes = readdirSync(publicDir);
    let fileFound = false;

    for (const type of fileTypes) {
      const typePath = join(publicDir, type);
      const typeStats = statSync(typePath);
      
      if (typeStats.isDirectory()) {
        const filePath = join(typePath, fileName);
        if (existsSync(filePath)) {
          try {
            unlinkSync(filePath);
            fileFound = true;
            break;
          } catch (error) {
            throw new Error(`删除文件失败: ${error.message}`);
          }
        }
      }
    }

    if (!fileFound) {
      throw new NotFoundException(`文件 ${fileName} 不存在`);
    }
  }
} 