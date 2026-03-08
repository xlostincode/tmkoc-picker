import fs from "fs";
import path from "path";

const dbPath = path.join(process.cwd(), "catalog.db");

fs.copyFileSync(dbPath, path.join(process.cwd(), `catalog.db.${Date.now()}.bkp`));

fs.unlinkSync(dbPath);

console.log("Database dropped successfully");