import { IsString, IsEnum, IsOptional, IsBoolean, IsNumber, MinLength, MaxLength } from 'class-validator';
import { DocumentType } from '../entities/document.entity';

export class CreateDocumentDto {
  @IsString()
  @MinLength(1)
  @MaxLength(100)
  title: string;

  @IsString()
  @MinLength(1)
  content: string;

  @IsEnum(DocumentType, {
    message: 'type must be one of the following values: css, html, js, article'
  })
  type: DocumentType;

  @IsString()
  @IsOptional()
  @MaxLength(50)
  language?: string;

  @IsString()
  @IsOptional()
  @MaxLength(200)
  description?: string;

  @IsBoolean()
  @IsOptional()
  isPublic?: boolean;

  @IsNumber()
  @IsOptional()
  userId?: number;
} 