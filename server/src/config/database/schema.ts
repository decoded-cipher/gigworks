import { sql } from "drizzle-orm";
import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core';


// Users table
export const users = sqliteTable('users', {
    id: integer().primaryKey(),
    name: text(),
    email: text(),
});
