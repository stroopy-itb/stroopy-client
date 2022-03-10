export default class WebStorage implements Storage {
  private storage: Storage;

  length: number;

  constructor(storage: Storage) {
    this.storage = storage;
    this.length = 0;
  }

  getItem<T>(key: string): T | null {
    const item = this.storage.getItem(key) as string | null;

    if (item) {
      return JSON.parse(item) as T;
    }

    return null;
  }

  setItem<T>(key: string, value: T): void {
    this.length += 1;
    this.storage.setItem(key, JSON.stringify(value));
  }

  removeItem(key: string): void {
    this.length -= 1;
    this.storage.removeItem(key);
  }

  clear(): void {
    this.length = 0;
    this.storage.clear();
  }

  key(index: number): string | null {
    return this.storage.key(index);
  }
}