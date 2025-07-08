import * as SQLite from 'expo-sqlite';

let db;

export async function initDatabase() {
  db = await SQLite.openDatabaseAsync('menu.db');
  await db.execAsync(`
    CREATE TABLE IF NOT EXISTS menu (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT,
      price REAL,
      description TEXT,
      image TEXT,
      category TEXT
    );
  `);
}

export async function fetchFromDatabase() {
  if (!db) await initDatabase();
  return await db.getAllAsync('SELECT * FROM menu');
}

export async function insertMenuItems(menuItems) {
  if (!db) await initDatabase();

  await db.withTransactionAsync(async () => {
    for (const item of menuItems) {
      await db.runAsync(
        'INSERT INTO menu (name, price, description, image, category) VALUES (?, ?, ?, ?, ?)',
        item.name,
        item.price,
        item.description,
        item.image,
        item.category
      );
    }
  });
}

export async function queryFilteredMenu(searchText, selectedCategories) {
  if (!db) await initDatabase();
  let query = 'SELECT * FROM menu';
  const params = [];
  const hasSearch = !!searchText;
  const hasCategories = selectedCategories && selectedCategories.length > 0;
  if (hasSearch) {
    query += ' WHERE name LIKE ?';
    params.push(`%${searchText}%`);
  }
  if (hasCategories) {
    const categoryPlaceholders = selectedCategories.map(() => '?').join(', ');
    query += hasSearch ? ` AND category IN (${categoryPlaceholders})` : ` WHERE category IN (${categoryPlaceholders})`;
    params.push(...selectedCategories);
  }
  const result = await db.getAllAsync(query, params);
  return result;
}

export async function fetchAndStoreRemoteMenu() {
  const response = await fetch(
    'https://raw.githubusercontent.com/Meta-Mobile-Developer-PC/Working-With-Data-API/main/capstone.json'
  );
  const json = await response.json();
  await insertMenuItems(json.menu);
  return json.menu;
}

export function getUniqueCategories(items) {
  return [...new Set(items.map(item => item.category))];
}

export async function dropMenuTable() {
  if (!db) await initDatabase();
  await db.execAsync('DROP TABLE IF EXISTS menu;');
}