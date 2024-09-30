ALTER TABLE "fitness_user_profiles" ADD PRIMARY KEY ("id");--> statement-breakpoint
ALTER TABLE "fitness_user_profiles" ALTER COLUMN "id" SET DATA TYPE uuid;--> statement-breakpoint
ALTER TABLE "fitness_user_profiles" ALTER COLUMN "id" SET DEFAULT gen_random_uuid();--> statement-breakpoint
ALTER TABLE "fitness_user_profiles" ALTER COLUMN "id" SET NOT NULL;