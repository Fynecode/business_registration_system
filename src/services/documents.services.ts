import { CloudinaryDocumentRepository } from "@/infrastructure/cloudinary/cloudinary.repository";
import { UploadDocumentUseCase } from "@/application/document/upload-document.use-case";
import { UploadDocumentsUseCase } from "@/application/document/upload-documents.use-case";
import { DownloadDocumentUseCase } from "@/application/document/download-document.use-case";

const repository = new CloudinaryDocumentRepository()

export const uploadDocumentUseCase = new UploadDocumentUseCase(repository)

export const uploadDocumentsUseCase = new UploadDocumentsUseCase(repository)

export const downloadDocumentUseCase = new DownloadDocumentUseCase(repository)