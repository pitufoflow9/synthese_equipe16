CREATE TABLE IF NOT EXISTS `user_images` (
	`id` text PRIMARY KEY NOT NULL,
	`user_id` text NOT NULL,
	`url` text NOT NULL,
	`description` text,
	`created_at` integer DEFAULT 0
);
--> statement-breakpoint
ALTER TABLE `nodes` ADD `is_node_temp_custom` integer DEFAULT false NOT NULL;--> statement-breakpoint
ALTER TABLE `nodes` ADD `is_node_img` integer DEFAULT false NOT NULL;--> statement-breakpoint
ALTER TABLE `nodes` ADD `temp_ambiance` text;--> statement-breakpoint
ALTER TABLE `nodes` ADD `temp_effect` text;--> statement-breakpoint
ALTER TABLE `nodes` ADD `temp_image_url` text;
