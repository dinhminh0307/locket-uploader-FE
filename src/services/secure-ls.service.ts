import SecureLS from 'secure-ls';

class SecureStorageService {
  private storage: SecureLS;

  constructor() {
    const encryptionSecret = import.meta.env.VITE_LS_HASH_KEY;
    this.storage = new SecureLS({
      encodingType: 'aes',
      isCompression: false,
      encryptionSecret: encryptionSecret// Consider using an environment variable
    });
  }

  setItem(key: string, value: any): void {
    try {
      this.storage.set(key, value);
    } catch (error) {
      console.error('Error setting secure storage item:', error);
    }
  }

  getItem<T>(key: string): T | null {
    try {
      return this.storage.get(key) as T;
    } catch (error) {
      console.error('Error getting secure storage item:', error);
      return null;
    }
  }

  removeItem(key: string): void {
    try {
      this.storage.remove(key);
    } catch (error) {
      console.error('Error removing secure storage item:', error);
    }
  }

  clear(): void {
    try {
      this.storage.removeAll();
    } catch (error) {
      console.error('Error clearing secure storage:', error);
    }
  }
}

export const secureStorage = new SecureStorageService();