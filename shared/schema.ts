import { pgTable, text, serial, integer, boolean } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const fixtures = pgTable("fixtures", {
  id: serial("id").primaryKey(),
  opponent: text("opponent").notNull(),
  date: text("date").notNull(),
  status: text("status").notNull(),
});

export const matches = pgTable("matches", {
  id: serial("id").primaryKey(),
  score: text("score").notNull(),
  message: text("message").notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export const insertFixtureSchema = createInsertSchema(fixtures).pick({
  opponent: true,
  date: true,
  status: true,
});

export const insertMatchSchema = createInsertSchema(matches).pick({
  score: true,
  message: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
export type InsertFixture = z.infer<typeof insertFixtureSchema>;
export type Fixture = typeof fixtures.$inferSelect;
export type InsertMatch = z.infer<typeof insertMatchSchema>;
export type Match = typeof matches.$inferSelect;

// Cricket data response schema
export const cricketDataSchema = z.object({
  fixtures: z.array(z.object({
    opponent: z.string(),
    date: z.string(),
    status: z.string(),
  })),
  score: z.string(),
  message: z.string(),
});

export type CricketData = z.infer<typeof cricketDataSchema>;
