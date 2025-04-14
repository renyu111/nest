import { Injectable } from '@nestjs/common';
import { join } from 'path';
import { readdirSync, statSync } from 'fs';
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
} 