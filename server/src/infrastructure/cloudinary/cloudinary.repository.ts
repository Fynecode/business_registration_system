import type {
    DocumentRepository,
    UploadedFile
} from '@/domain/document/document.repository'

import type { Document } from '@/domain/document/document.types'

import { cloudinary } from '@/config/cloudinary.config'

export class CloudinaryDocumentRepository
    implements DocumentRepository {

    async upload(
        file: UploadedFile
    ): Promise<Document> {

        return new Promise((resolve, reject) => {

            const uploadStream =
                cloudinary.uploader.upload_stream(
                    {
                        resource_type: 'raw',
                        folder: 'business-requests',
                    },
                    (error, result) => {

                        if (error) {
                            reject(error)
                            return
                        }

                        if (!result) {
                            reject(
                                new Error(
                                    'Cloudinary upload returned no result'
                                )
                            )
                            return
                        }

                        resolve({
                            publicId: result.public_id,
                            url: result.secure_url,
                            fileName: file.fileName,
                            fileSize: file.fileSize,
                            mimeType: file.mimeType,
                        })
                    }
                )

            uploadStream.end(file.buffer)
        })
    }

    async delete(
        publicId: string
    ): Promise<void> {

        const result =
            await cloudinary.uploader.destroy(
                publicId,
                {
                    resource_type: 'raw',
                }
            )

        if (
            result.result !== 'ok' &&
            result.result !== 'not found'
        ) {
            throw new Error(
                `Failed to delete Cloudinary document: ${result.result}`
            )
        }
    }
}