import type { Document } from './document.types';

export interface DocumentRepository {
  upload(file: File): Promise<Document>;
  uploadMany(files: File[]): Promise<Document[]>;
  delete(publicId: string): Promise<void>;
}