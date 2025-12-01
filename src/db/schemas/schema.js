import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const Histoires = sqliteTable("histoires", {
  id: text("id").primaryKey(),
  title: text("title").notNull(),
  synopsis: text("synopsis").notNull(),
  creator_id: text("creator_id"),
  theme: text("theme"),
  musique: text("musique"),
  animation: text("animation"),
  is_published: integer("is_published", { mode: "boolean" })
    .default(false)
    .notNull(),
  created_at: integer("created_at", { mode: "timestamp_ms" }).default(0),
});

export const Nodes = sqliteTable("nodes", {
  id: text("id").primaryKey(),
  histoire_id: text("histoire_id").references(() => Histoires.id),
  titre: text("titre"),
  contenu: text("contenu"),
  type: text("type").default("story").notNull(), // start|story|end
  is_ending: integer("is_ending", { mode: "boolean" }).default(false).notNull(),
  position_x: integer("position_x").default(0).notNull(),
  position_y: integer("position_y").default(0).notNull(),
});

export const Branches = sqliteTable("edges", {
  id: text("id").primaryKey(),
  histoire_id: text("histoire_id").references(() => Histoires.id),
  source: text("source").references(() => Nodes.id),
  target: text("target").references(() => Nodes.id),
  texte: text("texte"),
  type: text("type").default("regular").notNull(), // regular|history|conditional
  history_key: text("history_key"),
});

export const Img = sqliteTable("images", {
  id: text("id").primaryKey(),
  url: text("url").notNull(),
  description: text("description"),
});

export const Audio = sqliteTable("audios", {
  id: text("id").primaryKey(),
  url: text("url").notNull(),
  description: text("description"),
});
