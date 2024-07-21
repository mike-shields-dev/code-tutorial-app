CREATE SCHEMA "schema";
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "schema"."lessons" (
	"id" serial PRIMARY KEY NOT NULL,
	"title" text NOT NULL,
	CONSTRAINT "lessons_title_unique" UNIQUE("title")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "schema"."topics" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	CONSTRAINT "topics_name_unique" UNIQUE("name")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "schema"."tutorial_topics" (
	"tutorial_id" integer NOT NULL,
	"topic_id" integer NOT NULL,
	CONSTRAINT "tutorial_topics_tutorial_id_topic_id_unique" UNIQUE("tutorial_id","topic_id")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "schema"."tutorials" (
	"id" serial PRIMARY KEY NOT NULL,
	"title" text NOT NULL,
	CONSTRAINT "tutorials_title_unique" UNIQUE("title")
);
--> statement-breakpoint
DROP TABLE "lessons";--> statement-breakpoint
DROP TABLE "topics";--> statement-breakpoint
DROP TABLE "tutorial_topics";--> statement-breakpoint
DROP TABLE "tutorials";--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "schema"."tutorial_topics" ADD CONSTRAINT "tutorial_topics_tutorial_id_tutorials_id_fk" FOREIGN KEY ("tutorial_id") REFERENCES "schema"."tutorials"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "schema"."tutorial_topics" ADD CONSTRAINT "tutorial_topics_topic_id_topics_id_fk" FOREIGN KEY ("topic_id") REFERENCES "schema"."topics"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
