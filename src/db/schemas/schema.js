import { integer, sqliteTable, text} from "drizzle-orm/sqlite-core";


export const Histoires = sqliteTable("histoires", {
  id: text("id").primaryKey(),
  title: text("title").notNull(),
  synopsis : text("synopsis").notNull(),
  creator_id: text("creator_id"),
  theme : text("theme"),
  musique : text("musique"),
  animation : text("animation")
});
export const Nodes = sqliteTable("nodes", {
  id: text("id").primaryKey(),
  histoire_id: text("histoire_id").references(() => Histoires.id),
  titre: text("titre"),
  contenu: text("contenu"),
  position_x: integer("position_x"),
  position_y: integer("position_y"),
  data: text("data"),

});
export const Branches = sqliteTable("edges", {
  id: text("id").primaryKey(),
  histoire_id: text("histoire_id").references(() => Histoires.id),
  sources : text("source").references(() => Nodes.id),
  target : text("target").references(() => Nodes.id),
  texte : text("texte"),
});
export const Img = sqliteTable("images", {
    id: text("id").primaryKey(),
    url : text("url").notNull(),
    description : text("description")
});

export const Audio = sqliteTable("audios", {
    id: text("id").primaryKey(),
    url : text("url").notNull(),
    description : text("description")
});