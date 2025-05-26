export class Hash {
    private static encoder = new TextEncoder();
    private static decoder = new TextDecoder();

    static async getKey(): Promise<CryptoKey> {
        const password = (process.env.COOKIE_SECRET || 'super-secret-key');
        const keyMaterial = await crypto.subtle.importKey(
            'raw',
            this.encoder.encode(password),
            'PBKDF2',
            false,
            ['deriveKey']
        );

        return crypto.subtle.deriveKey(
            {
                name: 'PBKDF2',
                salt: this.encoder.encode('salt'),
                iterations: 100000,
                hash: 'SHA-256'
            },
            keyMaterial,
            { name: 'AES-GCM', length: 256 },
            false,
            ['encrypt', 'decrypt']
        );
    }

    static async encrypt(value: string): Promise<string> {
        const key = await this.getKey();
        const iv = crypto.getRandomValues(new Uint8Array(12));
        const encrypted = await crypto.subtle.encrypt(
            { name: 'AES-GCM', iv },
            key,
            this.encoder.encode(value)
        );

        return `${Buffer.from(iv).toString('hex')}.${Buffer.from(encrypted).toString('hex')}`;
    }

    static async decrypt(value: string): Promise<string> {
        const [ivHex, encryptedHex] = value.split('.');
        const key = await this.getKey();

        const iv = new Uint8Array(Buffer.from(ivHex, 'hex'));
        const encrypted = new Uint8Array(Buffer.from(encryptedHex, 'hex'));

        const decrypted = await crypto.subtle.decrypt(
            { name: 'AES-GCM', iv },
            key,
            encrypted
        );

        return this.decoder.decode(decrypted);
    }

    // Hashing (basic HMAC equivalent) — optional
    static async hashKey(key: string): Promise<string> {
        const keyBuffer = this.encoder.encode(key);
        const hashBuffer = await crypto.subtle.digest('SHA-256', keyBuffer);
        return Buffer.from(hashBuffer).toString('hex');
    }
}
