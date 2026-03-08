import { db } from "./db.js";
import { SHOWS } from "../const.js";

for (const show of Object.values(SHOWS)) {
    db.upsertShow(show.SLUG, show.TITLE);
}

console.log("Database seeded successfully");
