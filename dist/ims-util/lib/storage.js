"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ImsStorage {
    async set(key, obj) {
        localStorage.setItem(key, JSON.stringify(obj));
    }
    async get(key) {
        const res = localStorage.getItem(key);
        return JSON.parse(res);
    }
    async remove(key) {
        localStorage.removeItem(key);
    }
    async clear() {
        localStorage.clear();
    }
    static async create() {
        return new ImsStorage();
    }
}
exports.ImsStorage = ImsStorage;
