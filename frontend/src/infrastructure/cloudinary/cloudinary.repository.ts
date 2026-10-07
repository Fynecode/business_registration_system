import type { DocumentRepository } from '@/domain/document/document.repository';
import type { Document } from '@/domain/document/document.types';
import { retryOnNetworkError } from '@/services/network.service';

export class CloudinaryDocumentRepository implements DocumentRepository {
    private readonly cloudName: string = import.meta.env.VITE_CLOUDINARY_NAME;
    private readonly uploadPreset: string = import.meta.env.VITE_CLOUDINARY_PRESET;


    async upload(file: File): Promise<Document> {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('upload_preset', this.uploadPreset);

        const response = await retryOnNetworkError(
            () => fetch(
                `https://api.cloudinary.com/v1_1/${this.cloudName}/raw/upload`,
                {
                    method: 'POST',
                    body: formData,
                }
            )
        );

        if (!response.ok) {
            const bodyText = await response.text();

            throw new Error(
                `Cloudinary upload failed with status ${response.status}: ${bodyText}`
            );
        }

        const data = await response.json();

        return {
            publicId: data.public_id,
            url: data.secure_url,
            fileName: file.name,
            fileSize: file.size,
            mimeType: file.type,
        };
    }

    async uploadMany(files: File[]): Promise<Document[]> {
        const promises = files.map(file => this.upload(file));
        return Promise.all(promises);
    }

    async delete(publicId: string): Promise<void> {
        // Implement the actual API call to delete the document from Cloudinary
    }

    async download(document: Document): Promise<void> {
        console.log("Cloudinary URL:", document.url);
        const response = await fetch(document.url);

        if (!response.ok) {
            throw new Error(
                `Document download failed with status ${response.status}`
            );
        }

        const blob = await response.blob();

        const url = URL.createObjectURL(blob);

        const anchor = window.document.createElement('a');
        anchor.href = url;
        anchor.download = document.fileName;
        
        window.document.body.appendChild(anchor);
        anchor.click();
        anchor.remove();

        URL.revokeObjectURL(url);
    }
}