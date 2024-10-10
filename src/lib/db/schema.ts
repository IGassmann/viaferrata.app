import * as PublicID from "@/lib/PublicID";
import { sql } from "drizzle-orm";
import {
  bigserial,
  geometry,
  interval,
  pgEnum,
  pgTable,
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
  internalID: bigserial("internal_id", { mode: "number" }).primaryKey(),
  publicID: varchar("public_id", { length: PublicID.MAX_LENGTH })
    .$type<PublicID.PublicID<typeof PublicID.PREFIXES.route>>()
    .unique()
    .notNull()
    .$defaultFn(() => PublicID.create(PublicID.PREFIXES.route)),
  name: varchar("name", { length: 256 }).notNull(),
  difficultyGrade: difficultyGradeEnum().notNull(),
  duration: interval("duration").notNull(),
  coordinates: geometry("position", {
    type: "point",
    mode: "xy",
    srid: 4326,
  }).notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at")
    .default(sql`NULL`)
    .$onUpdate(() => new Date()),
});

export type Route = typeof routes.$inferSelect;
export type NewRoute = typeof routes.$inferInsert;
