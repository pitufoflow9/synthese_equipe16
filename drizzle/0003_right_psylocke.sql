PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_edges` (
	`id` text PRIMARY KEY NOT NULL,
	`histoire_id` text,
	`source` text,
	`target` text,
	`texte` text,
	FOREIGN KEY (`histoire_id`) REFERENCES `histoires`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`source`) REFERENCES `nodes`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`target`) REFERENCES `nodes`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
INSERT INTO `__new_edges`("id", "histoire_id", "source", "target", "texte") SELECT "id", "histoire_id", "source", "target", "texte" FROM `edges`;--> statement-breakpoint
DROP TABLE `edges`;--> statement-breakpoint
ALTER TABLE `__new_edges` RENAME TO `edges`;--> statement-breakpoint
PRAGMA foreign_keys=ON;--> statement-breakpoint
CREATE TABLE `__new_nodes` (
	`id` text PRIMARY KEY NOT NULL,
	`histoire_id` text,
	`titre` text,
	`contenu` text,
	`position_x` integer,
	`position_y` integer,
	`data` text,
	FOREIGN KEY (`histoire_id`) REFERENCES `histoires`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
INSERT INTO `__new_nodes`("id", "histoire_id", "titre", "contenu", "position_x", "position_y", "data") SELECT "id", "histoire_id", "titre", "contenu", "position_x", "position_y", "data" FROM `nodes`;--> statement-breakpoint
DROP TABLE `nodes`;--> statement-breakpoint
ALTER TABLE `__new_nodes` RENAME TO `nodes`;