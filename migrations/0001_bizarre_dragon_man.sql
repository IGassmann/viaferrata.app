CREATE TABLE IF NOT EXISTS "routes" (
	"internal_id" bigserial PRIMARY KEY NOT NULL,
	"public_id" varchar(18) NOT NULL,
	"name" varchar(256) NOT NULL,
	"duration" interval NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT NULL,
	CONSTRAINT "routes_public_id_unique" UNIQUE("public_id")
);
