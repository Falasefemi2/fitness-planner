CREATE TABLE IF NOT EXISTS "fitness_generated_exercises" (
	"id" varchar(255) PRIMARY KEY NOT NULL,
	"user_id" varchar(255) NOT NULL,
	"exercises" jsonb NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "fitness_generated_exercises" ADD CONSTRAINT "fitness_generated_exercises_user_id_fitness_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."fitness_users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
