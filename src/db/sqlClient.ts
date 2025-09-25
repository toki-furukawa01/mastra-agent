// src/db/sqlClient.ts
import Database from "better-sqlite3";

// データベースファイルを指定
export const sqlClient = new Database("../../weather_test_data.db", { readonly: true });
