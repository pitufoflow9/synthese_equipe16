import { sqliteTable, AnySQLiteColumn, foreignKey, text, integer, uniqueIndex } from "drizzle-orm/sqlite-core"
  import { sql } from "drizzle-orm"

export const account = sqliteTable("account", {
	id: text().primaryKey().notNull(),
	accountId: text("account_id").notNull(),
	providerId: text("provider_id").notNull(),
	userId: text("user_id").notNull().references(() => user.id, { onDelete: "cascade" } ),
	accessToken: text("access_token"),
	refreshToken: text("refresh_token"),
	idToken: text("id_token"),
	accessTokenExpiresAt: integer("access_token_expires_at"),
	refreshTokenExpiresAt: integer("refresh_token_expires_at"),
	scope: text(),
	password: text(),
	createdAt: integer("created_at").default(sql`(cast(unixepoch('subsecond') * 1000 as integer))`).notNull(),
	updatedAt: integer("updated_at").notNull(),
});

export const session = sqliteTable("session", {
	id: text().primaryKey().notNull(),
	expiresAt: integer("expires_at").notNull(),
	token: text().notNull(),
	createdAt: integer("created_at").default(sql`(cast(unixepoch('subsecond') * 1000 as integer))`).notNull(),
	updatedAt: integer("updated_at").notNull(),
	ipAddress: text("ip_address"),
	userAgent: text("user_agent"),
	userId: text("user_id").notNull().references(() => user.id, { onDelete: "cascade" } ),
},
(table) => [
	uniqueIndex("session_token_unique").on(table.token),
]);

export const user = sqliteTable("user", {
	id: text().primaryKey().notNull(),
	name: text().notNull(),
	email: text().notNull(),
	emailVerified: integer("email_verified").default(false).notNull(),
	image: text(),
	createdAt: integer("created_at").default(sql`(cast(unixepoch('subsecond') * 1000 as integer))`).notNull(),
	updatedAt: integer("updated_at").default(sql`(cast(unixepoch('subsecond') * 1000 as integer))`).notNull(),
},
(table) => [
	uniqueIndex("user_email_unique").on(table.email),
]);

export const verification = sqliteTable("verification", {
	id: text().primaryKey().notNull(),
	identifier: text().notNull(),
	value: text().notNull(),
	expiresAt: integer("expires_at").notNull(),
	createdAt: integer("created_at").default(sql`(cast(unixepoch('subsecond') * 1000 as integer))`).notNull(),
	updatedAt: integer("updated_at").default(sql`(cast(unixepoch('subsecond') * 1000 as integer))`).notNull(),
});

export const audios = sqliteTable("audios", {
	id: text().primaryKey().notNull(),
	url: text().notNull(),
	description: text(),
});

export const images = sqliteTable("images", {
	id: text().primaryKey().notNull(),
	url: text().notNull(),
	description: text(),
});

export const histoires = sqliteTable("histoires", {
	id: text().primaryKey().notNull(),
	title: text().notNull(),
	synopsis: text().notNull(),
	creatorId: text("creator_id"),
	theme: text(),
	musique: text(),
	animation: text(),
	likes: integer().default(0).notNull(),
	dislikes: integer().default(0).notNull(),
	isPublished: integer("is_published").default(false).notNull(),
	createdAt: integer("created_at").default(0),
});

export const edges = sqliteTable("edges", {
	id: text().primaryKey().notNull(),
	histoireId: text("histoire_id").references(() => histoires.id),
	source: text().references(() => nodes.id),
	target: text().references(() => nodes.id),
	texte: text(),
	type: text().default("regular").notNull(),
	historyKey: text("history_key"),
});

export const nodes = sqliteTable("nodes", {
	id: text().primaryKey().notNull(),
	histoireId: text("histoire_id").references(() => histoires.id),
	titre: text(),
	contenu: text(),
	type: text().default("story").notNull(),
	isEnding: integer("is_ending").default(false).notNull(),
	positionX: integer("position_x").default(0).notNull(),
	positionY: integer("position_y").default(0).notNull(),
});

export const userImages = sqliteTable("user_images", {
	id: text().primaryKey().notNull(),
	userId: text("user_id").notNull(),
	url: text().notNull(),
	description: text(),
	createdAt: integer("created_at").default(0),
});
