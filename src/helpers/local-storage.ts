export class LocalStorage {
    constructor(private provider = localStorage) {}

    setItem = (key: string, token: string, ttl: number = 1000 * 60 * 60) => {
        const now = new Date()
        const item = {
            value: token,
            expiry: now.getTime() + ttl,
        }
        this.provider.setItem(key, JSON.stringify(item))
    }
    
    deleteItem = (key: string) => {
        this.provider.removeItem(key);
    }
    
    getItem = (key: string): string | null => {
        return this.provider.getItem(key);
    }
}