import crypto from 'crypto';

const SECRET = process.env.COOKIE_SECRET || 'super-secret-key';

export class Hash {
    static hashKey(key: string): string {
        return crypto.createHmac('sha256', SECRET).update(key).digest('hex');
    }

    static encrypt(value: string): string {
        const cipher = crypto.createCipher('aes-256-cbc', SECRET);
        let encrypted = cipher.update(value, 'utf8', 'hex');
        encrypted += cipher.final('hex');
        return encrypted;
    }

    static decrypt(value: string): string {
        const decipher = crypto.createDecipher('aes-256-cbc', SECRET);
        let decrypted = decipher.update(value, 'hex', 'utf8');
        decrypted += decipher.final('utf8');
        return decrypted;
    }
}
