import { createCipheriv, createHash, createDecipheriv } from 'crypto';
import { config } from 'dotenv';
config();

const secret_key = process.env.KEY;
const secret_iv = process.env.IV;
const algorithm = process.env.ALGORITHM;
const key = createHash('sha512')
    .update(secret_key)
    .digest('hex')
    .substring(0, 32)
const encryptionIV = createHash('sha512')
    .update(secret_iv)
    .digest('hex')
    .substring(0, 16)

// Encrypt data
export function encryptData(data: string): string {
    const cipher = createCipheriv(algorithm, key, encryptionIV);
    return Buffer.from(
        cipher.update(data, 'utf8', 'hex') + cipher.final('hex')
    ).toString('base64');
}

// Decrypt data
export function decryptData(encryptedData: string): string {
    const buff = Buffer.from(encryptedData, 'base64');
    const decipher = createDecipheriv(algorithm, key, encryptionIV);
    return (
        decipher.update(buff.toString('utf8'), 'hex', 'utf8') +
        decipher.final('utf8')
    );
}