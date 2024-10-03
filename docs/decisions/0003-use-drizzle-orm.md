# Use Drizzle ORM

## Context and Problem Statement

I need a way to define the database schema and query it. What should I use?

## Decision Drivers

- I'm working alone on this project, and it will probably stay that way.
- I want to optimize for learning useful skills, but without sacrificing stability and maintainability.
- Type-safety is important to me.

## Considered Options

- Prisma
- Drizzle ORM

## Decision Outcome

Chosen option: "Drizzle ORM," because it doesn’t use code generation and is more similar to SQL.

### Consequences

- Good, because I'll improve my SQL skills
- Good, because no need of a code generation step
- Bad, because I'll be less productive when writing complex queries

## Pros and Cons of the Options

### Drizzle ORM

#### Pros

- Uses an SQL-like syntax
  - Learning Drizzle makes you learn SQL
- [Effect integration](https://github.com/Effect-TS/effect/tree/main/packages/sql-drizzle)

#### Cons

- More complex API for schema definition
- Type-safety is limited when writing queries. You can write queries that are invalid at runtime.
  - It can be mitigated by using the ESLint Drizzle plugin

### Prisma

#### Pros

- Easy-to-use and intuitive API for both schema definition and querying

#### Cons

- Uses a custom query language
- A single Prisma query can sometimes result in multiple SQL queries
- Uses code generation
  - TypeScript type checking can be slow to process the generated code in the IDE
