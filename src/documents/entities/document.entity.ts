import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';

export enum DocumentType {
  CSS = 'css',
  HTML = 'html',
  JS = 'js',
  ARTICLE = 'article'
}

@Entity()
export class Document {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100 })
  title: string;

  @Column({ type: 'text' })
  content: string;

  @Column({
    type: 'enum',
    enum: DocumentType,
    default: DocumentType.ARTICLE,
  })
  type: DocumentType;

  @Column({ length: 50, nullable: true })
  language: string;

  @Column({ length: 200, nullable: true })
  description: string;

  @Column({ default: false })
  isPublic: boolean;

  @Column({ nullable: true })
  userId: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
} 