import { useState, useEffect } from 'react';

// Shared cache to avoid redundant fetches across multiple components
const memoryCache: Record<string, any> = {};
const pendingPromises: Record<string, Promise<any>> = {};

async function fetchJSON(collectionName: string): Promise<any> {
  if (memoryCache[collectionName]) {
    return memoryCache[collectionName];
  }
  if (pendingPromises[collectionName] !== undefined) {
    return pendingPromises[collectionName];
  }

  const promise = (async () => {
    try {
      const response = await fetch(`/content/${collectionName}.json`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      memoryCache[collectionName] = data;
      return data;
    } catch (error) {
      console.warn(`CMS Hook failed to fetch collection "${collectionName}":`, error);
      // Return null to allow hooks to fall back to component-level defaults
      return null;
    } finally {
      delete pendingPromises[collectionName];
    }
  })();

  pendingPromises[collectionName] = promise;
  return promise;
}

export function useCMSCollection<T>(collectionName: string) {
  const [data, setData] = useState<T[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;

    async function load() {
      setLoading(true);
      const rawData = await fetchJSON(collectionName);
      if (!active) return;

      if (!rawData) {
        setData([]);
      } else {
        let list: T[] = [];
        if (Array.isArray(rawData)) {
          list = rawData as T[];
        } else if (rawData && typeof rawData === 'object' && Array.isArray((rawData as any).items)) {
          list = (rawData as any).items as T[];
        } else if (rawData && typeof rawData === 'object' && Array.isArray((rawData as any).data)) {
          list = (rawData as any).data as T[];
        }

        // Sort items by 'order' ascending if present
        const sorted = [...list].sort((a: any, b: any) => {
          const orderA = typeof a.order === 'number' ? a.order : 0;
          const orderB = typeof b.order === 'number' ? b.order : 0;
          return orderA - orderB;
        });

        setData(sorted);
      }
      setLoading(false);
    }

    load();

    return () => {
      active = false;
    };
  }, [collectionName]);

  return { data, loading };
}

export function useCMSDocument<T>(collectionName: string, _documentId: string) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;

    async function load() {
      setLoading(true);
      const rawData = await fetchJSON(collectionName);
      if (!active) return;

      if (rawData && typeof rawData === 'object') {
        setData(rawData as T);
      } else {
        setData(null);
      }
      setLoading(false);
    }

    load();

    return () => {
      active = false;
    };
  }, [collectionName, _documentId]);

  return { data, loading };
}
