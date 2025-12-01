PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_nodes` (
	`id` text PRIMARY KEY NOT NULL,
	`histoire_id` text,
	`titre` text,
	`contenu` text,
	`type` text DEFAULT 'story' NOT NULL,
	`is_ending` integer DEFAULT false NOT NULL,
	`position_x` integer DEFAULT 0 NOT NULL,
	`position_y` integer DEFAULT 0 NOT NULL,
	FOREIGN KEY (`histoire_id`) REFERENCES `histoires`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
INSERT INTO `__new_nodes`("id", "histoire_id", "titre", "contenu", "type", "is_ending", "position_x", "position_y") SELECT "id", "histoire_id", "titre", "contenu", "type", "is_ending", "position_x", "position_y" FROM `nodes`;--> statement-breakpoint
DROP TABLE `nodes`;--> statement-breakpoint
ALTER TABLE `__new_nodes` RENAME TO `nodes`;--> statement-breakpoint
PRAGMA foreign_keys=ON;--> statement-breakpoint
ALTER TABLE `edges` ADD `type` text DEFAULT 'regular' NOT NULL;--> statement-breakpoint
ALTER TABLE `edges` ADD `history_key` text;--> statement-breakpoint
ALTER TABLE `histoires` ADD `is_published` integer DEFAULT false NOT NULL;--> statement-breakpoint
ALTER TABLE `histoires` ADD `created_at` integer DEFAULT 0;