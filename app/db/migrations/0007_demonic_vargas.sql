/* 
    Unfortunately in current drizzle-kit version we can't automatically get name for primary key.
    We are working on making it available!

    Meanwhile you can:
        1. Check pk name in your database, by running
            SELECT constraint_name FROM information_schema.table_constraints
            WHERE table_schema = 'public'
                AND table_name = 'fitness_user_profiles'
                AND constraint_type = 'PRIMARY KEY';
        2. Uncomment code below and paste pk name manually
        
    Hope to release this update as soon as possible
*/

-- ALTER TABLE "fitness_user_profiles" DROP CONSTRAINT "<constraint_name>";--> statement-breakpoint
ALTER TABLE "fitness_user_profiles" ADD COLUMN "id" varchar(255) PRIMARY KEY NOT NULL;--> statement-breakpoint
ALTER TABLE "fitness_user_profiles" ADD CONSTRAINT "fitness_user_profiles_user_id_unique" UNIQUE("user_id");