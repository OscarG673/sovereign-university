CREATE TABLE IF NOT EXISTS "content"."glossary" (
	"id" serial PRIMARY KEY NOT NULL,
	"resource_id" integer NOT NULL,
	"word" varchar(255) NOT NULL,
	"definition" text NOT NULL,
	"letter" varchar(1) NOT NULL,
	"language" varchar(10) NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "glossary_word_language_unique" UNIQUE("word","language")
);
--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "glossary_letter_language_index" ON "content"."glossary" ("letter","language");--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "content"."glossary" ADD CONSTRAINT "glossary_resource_id_resources_id_fk" FOREIGN KEY ("resource_id") REFERENCES "content"."resources"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
