DO $$ BEGIN
 CREATE TYPE "public"."difficulty_grade" AS ENUM('K1', 'K2', 'K3', 'K4', 'K5', 'K6');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
ALTER TABLE "routes" ADD COLUMN "difficultyGrade" "difficulty_grade" NOT NULL;--> statement-breakpoint
ALTER TABLE "routes" ADD COLUMN "position" geometry(point) NOT NULL;