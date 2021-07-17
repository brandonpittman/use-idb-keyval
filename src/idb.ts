const dbp = new Promise((resolve, reject) => {
  if (typeof window !== 'undefined') {
    const openreq = window.indexedDB.open('use-idb-keyval', 1);
    openreq.onerror = () => reject(openreq.error);
    openreq.onsuccess = () => resolve(openreq.result);
    openreq.onupgradeneeded = () => openreq.result.createObjectStore('idb');
  }
});

export const call: any = async (
  type: 'readonly' | 'readwrite',
  method: 'get' | 'put' | 'delete',
  ...args: string[]
) => {
  const db: any = await dbp;
  const transaction = db.transaction('idb', type);
  const store = transaction.objectStore('idb');

  return new Promise((resolve, reject) => {
    const req = store[method](...args);
    transaction.oncomplete = () => resolve(req);
    transaction.onabort = transaction.onerror = () => reject(transaction.error);
  });
};

export const remove = async (key: string) =>
  await call('readwrite', 'delete', key);

export const get = async (key: string) =>
  (await call('readonly', 'get', key)).result;

export const set = async (key: string, value: any) =>
  await call('readwrite', 'put', value, key);
