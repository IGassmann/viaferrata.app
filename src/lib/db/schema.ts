import * as PublicID from "@/lib/PublicID";
import { sql } from "drizzle-orm";
import {
  bigint,
  geometry,
  interval,
  pgEnum,
  pgTable,
  text,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";

export const difficultyGradeEnum = pgEnum("difficulty_grade", [
  "K1",
  "K2",
  "K3",
  "K4",
  "K5",
  "K6",
]);

export type DifficultyGrade = (typeof difficultyGradeEnum.enumValues)[number];

export const routes = pgTable("routes", {
  internalID: bigint("internal_id", { mode: "number" })
    .generatedAlwaysAsIdentity()
    .primaryKey(),
  publicID: varchar("public_id", { length: PublicID.MAX_LENGTH })
    .$type<PublicID.PublicID<typeof PublicID.PREFIXES.route>>()
    .unique()
    .notNull()
    .$defaultFn(() => PublicID.create(PublicID.PREFIXES.route)),
  name: text().notNull(),
  imageURL: text("image_url"),
  difficultyGrade: difficultyGradeEnum().notNull(),
  duration: interval().notNull(),
  coordinates: geometry({
    type: "point",
    mode: "xy",
    srid: 4326,
  }).notNull(),
  createdAt: timestamp("created_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true })
    .default(sql`NULL`)
    .$onUpdate(() => new Date()),
});

export type Route = typeof routes.$inferSelect;
export type NewRoute = typeof routes.$inferInsert;
