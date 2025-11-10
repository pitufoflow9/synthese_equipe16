CREATE TABLE `audios` (
	`id` text PRIMARY KEY NOT NULL,
	`url` text NOT NULL,
	`description` text
);
--> statement-breakpoint
CREATE TABLE `edges` (
	`id` text PRIMARY KEY NOT NULL,
	`histoire_id` text,
	`source` text NOT NULL,
	`target` text NOT NULL,
	`texte` text NOT NULL,
	FOREIGN KEY (`histoire_id`) REFERENCES `histoires`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`source`) REFERENCES `nodes`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`target`) REFERENCES `nodes`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `histoires` (
	`id` text PRIMARY KEY NOT NULL,
	`title` text NOT NULL,
	`synopsis` text NOT NULL,
	`creator_id` text NOT NULL,
	`created_at` integer NOT NULL,
	`theme` text,
	`musique` text,
	`animation` text
);
--> statement-breakpoint
CREATE TABLE `images` (
	`id` text PRIMARY KEY NOT NULL,
	`url` text NOT NULL,
	`description` text
);
--> statement-breakpoint
CREATE TABLE `nodes` (
	`id` text PRIMARY KEY NOT NULL,
	`histoire_id` text,
	`titre` text NOT NULL,
	`contenu` text NOT NULL,
	`position_x` integer NOT NULL,
	`position_y` integer NOT NULL,
	`data` text,
	FOREIGN KEY (`histoire_id`) REFERENCES `histoires`(`id`) ON UPDATE no action ON DELETE no action
);
