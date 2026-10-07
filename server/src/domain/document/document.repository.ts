import type { Document } from './document.types';

export interface UploadedFile {
    buffer: Buffer
    fileName: string
    fileSize: number
    mimeType: string
}

export interface DocumentRepository {
  upload(file: UploadedFile): Promise<Document>
  // uploadMany(files: UploadedFile[]): Promise<Document[]>;
  // download(document: Document): Promise<void>;
  delete(publicId: string): Promise<void>;
}