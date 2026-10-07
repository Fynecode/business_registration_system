import type { Document } from './document.types';

export interface DocumentRepository {
  upload(file: File): Promise<Document>;
  uploadMany(files: File[]): Promise<Document[]>;
  download(document: Document): Promise<void>;
  delete(publicId: string): Promise<void>;
}