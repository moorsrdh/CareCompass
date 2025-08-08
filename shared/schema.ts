import { sql } from "drizzle-orm";
import { pgTable, text, varchar, real, boolean } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const services = pgTable("services", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  category: text("category").notNull(),
  description: text("description").notNull(),
  address: text("address").notNull(),
  phone: text("phone").notNull(),
  hours: text("hours").notNull(),
  isOpen: boolean("is_open").notNull().default(false),
  status: text("status").notNull(),
  latitude: real("latitude").notNull(),
  longitude: real("longitude").notNull(),
  distance: real("distance"),
  services: text("services").array().notNull(),
  requirements: text("requirements")
});

export const insertServiceSchema = createInsertSchema(services).omit({
  id: true,
  distance: true
});

export type InsertService = z.infer<typeof insertServiceSchema>;
export type Service = typeof services.$inferSelect;

export const categories = [
  "food",
  "shelter", 
  "clothing",
  "hygiene",
  "healthcare",
  "social",
  "employment"
] as const;

export type Category = typeof categories[number];
