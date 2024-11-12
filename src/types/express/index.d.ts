// src/types/express.d.ts
declare namespace Express {
    export interface Multer {
        File: MulterFile
    }
    interface MulterFile {
        fieldname: string
        originalname: string
        encoding: string
        mimetype: string
        buffer: Buffer
        size: number
    }
}
