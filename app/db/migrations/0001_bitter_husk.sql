CREATE TABLE IF NOT EXISTS "fitness_user_profiles" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" varchar(255) NOT NULL,
	"gender" text,
	"goal" text,
	"focus_area" text
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "fitness_user_profiles" ADD CONSTRAINT "fitness_user_profiles_user_id_fitness_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."fitness_users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
