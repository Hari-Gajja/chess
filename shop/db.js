class DatabaseService {
    constructor() {
        this.dbName = 'watchHubDB';
        this.dbVersion = 1;
        this.init();
    }

    init() {
        const request = indexedDB.open(this.dbName, this.dbVersion);

        request.onerror = (event) => {
            console.error('Database error:', event.target.error);
        };

        request.onupgradeneeded = (event) => {
            const db = event.target.result;
            
            // Create stores
            if (!db.objectStoreNames.contains('users')) {
                const userStore = db.createObjectStore('users', { keyPath: 'email' });
                userStore.createIndex('name', 'name', { unique: false });
            }
            
            if (!db.objectStoreNames.contains('products')) {
                const productStore = db.createObjectStore('products', { keyPath: 'id', autoIncrement: true });
                productStore.createIndex('category', 'category', { unique: false });
                productStore.createIndex('material', 'material', { unique: false });
            }
        };
    }

    async addUser(user) {
        const db = await this.getDB();
        return new Promise((resolve, reject) => {
            const tx = db.transaction('users', 'readwrite');
            const store = tx.objectStore('users');
            const request = store.add(user);
            
            request.onsuccess = () => resolve(true);
            request.onerror = () => reject(request.error);
        });
    }

    async getUser(email) {
        const db = await this.getDB();
        return new Promise((resolve, reject) => {
            const tx = db.transaction('users', 'readonly');
            const store = tx.objectStore('users');
            const request = store.get(email);
            
            request.onsuccess = () => resolve(request.result);
            request.onerror = () => reject(request.error);
        });
    }

    async getAllUsers() {
        const db = await this.getDB();
        return new Promise((resolve, reject) => {
            const tx = db.transaction('users', 'readonly');
            const store = tx.objectStore('users');
            const request = store.getAll();
            
            request.onsuccess = () => resolve(request.result);
            request.onerror = () => reject(request.error);
        });
    }

    getDB() {
        return new Promise((resolve, reject) => {
            const request = indexedDB.open(this.dbName, this.dbVersion);
            request.onerror = () => reject(request.error);
            request.onsuccess = () => resolve(request.result);
        });
    }
}

const db = new DatabaseService();
