import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Document, DocumentType } from './entities/document.entity';
import { CreateDocumentDto } from './dto/create-document.dto';

@Injectable()
export class DocumentsService {
  constructor(
    @InjectRepository(Document)
    private documentsRepository: Repository<Document>,
  ) {}

  async create(createDocumentDto: CreateDocumentDto): Promise<Document> {
    const document = this.documentsRepository.create(createDocumentDto);
    return await this.documentsRepository.save(document);
  }

  async findAll(): Promise<Document[]> {
    return await this.documentsRepository.find();
  }

  async findOne(id: number): Promise<Document> {
    const document = await this.documentsRepository.findOne({ where: { id } });
    if (!document) {
      throw new NotFoundException(`Document with ID ${id} not found`);
    }
    return document;
  }

  async update(id: number, updateDocumentDto: Partial<CreateDocumentDto>): Promise<Document> {
    const document = await this.findOne(id);
    Object.assign(document, updateDocumentDto);
    return await this.documentsRepository.save(document);
  }

  async remove(id: number): Promise<void> {
    const result = await this.documentsRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Document with ID ${id} not found`);
    }
  }

  async findByType(type: DocumentType): Promise<Document[]> {
    return await this.documentsRepository
      .createQueryBuilder('document')
      .where('document.type = :type', { type })
      .getMany();
  }

  async findByUser(userId: number): Promise<Document[]> {
    return await this.documentsRepository.find({ where: { userId } });
  }
} 