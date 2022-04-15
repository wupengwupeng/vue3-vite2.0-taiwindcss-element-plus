interface ProxyStorage {
  getItem(key: string): any
  setItem(key: string, value: string): void
  removeItem(key: string): void
  clear(): void
}
class sessionStorageProxy implements ProxyStorage {
  protected storage: ProxyStorage
  constructor(proxyStorage: ProxyStorage) {
    this.storage = proxyStorage;
  }
  public getItem(key: string) {
    this.storage.getItem(JSON.parse(key))
  };
  public setItem(key: string, value: string): void {
    this.storage.setItem(key, JSON.stringify(value))
  };
  public removeItem(key: string): void {
    this.storage.removeItem(key)
  };
  public clear(): void {
    this.storage.clear()
  }
}

// localStorage operate
class localStorageProxy extends sessionStorageProxy implements ProxyStorage {
  constructor(localStorage: ProxyStorage) {
    super(localStorage)
  }
}

export const storageSession = new sessionStorageProxy(sessionStorage)
export const storageLocal = new localStorageProxy(localStorage)