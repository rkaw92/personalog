// db.ts
import Dexie, { type EntityTable } from 'dexie';

interface Entry {
  id: number;
  category: number;
  timestamp: Date;
  comment: string;
}

export interface Category {
  id: number;
  name: string;
}

// NOTE: The cache is disabled because otherwise, a unique constraint violation
// breaks any further rendering of live queries in Dexie + Svelte.
const db = new Dexie('personalog', { cache: 'disabled' }) as Dexie & {
  entries: EntityTable<Entry, 'id'>;
  categories: EntityTable<Category, 'id'>;
};

db.version(1).stores({
  entries: '++id, category',
  categories: '++id, &name'
});

export type { Entry };
export { db };
