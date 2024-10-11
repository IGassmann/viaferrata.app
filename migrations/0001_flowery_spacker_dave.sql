DO $$ BEGIN
 CREATE TYPE "public"."difficulty_grade" AS ENUM('K1', 'K2', 'K3', 'K4', 'K5', 'K6');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "routes" (
	"internal_id" bigint PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "routes_internal_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 9223372036854775807 START WITH 1 CACHE 1),
	"public_id" varchar(18) NOT NULL,
	"name" varchar(256) NOT NULL,
	"difficultyGrade" "difficulty_grade" NOT NULL,
	"duration" interval NOT NULL,
	"position" geometry(point) NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT NULL,
	CONSTRAINT "routes_public_id_unique" UNIQUE("public_id")
);
