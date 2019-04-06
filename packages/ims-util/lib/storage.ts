export class ImsStorage {

    async set(key: string, obj: any) {
        localStorage.setItem(key, JSON.stringify(obj))
    }

    async get<T>(key: string): Promise<T> {
        const res = localStorage.getItem(key);
        return JSON.parse(res);
    }

    async remove(key: string) {
        localStorage.removeItem(key)
    }

    async clear() {
        localStorage.clear()
    }

    static async create() {
        return new ImsStorage();
    }
}