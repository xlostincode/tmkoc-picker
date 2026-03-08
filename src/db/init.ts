import Database from "better-sqlite3";
import fs from "fs";
import path from "path";
import { env } from "../env.js";

const dbPath = path.join(process.cwd(), env.DATABASE);
const db = new Database(dbPath);

const schemaPath = path.join(process.cwd(), "sql", "schema.sql");
const schema = fs.readFileSync(schemaPath, "utf-8");

db.exec(schema);

console.log("Database initialized from schema.sql");