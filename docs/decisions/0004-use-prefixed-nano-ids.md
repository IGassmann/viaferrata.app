# Use Prefixed Nano IDs with Auto-Incremented Integer

## Context and Problem Statement

I need to generate unique IDs for the entities in the application. What should be the format of the
IDs?

## Considered Options

- [NanoID](https://github.com/ai/nanoid)
- [ULID](https://github.com/ulid/spec)
- [Cuid2](https://github.com/paralleldrive/cuid2)
- [UUID](https://en.wikipedia.org/wiki/Universally_unique_identifier)
- Auto-incremented integer

## Decision Outcome

Chosen option: "Prefixed Nano IDs along with auto-incremented integer."

There are [many available options](https://github.com/grantcarthew/awesome-unique-id) for generating
unique IDs, and there's [no widespread consensus](https://github.com/paralleldrive/cuid2/issues/7)
on which one to use for different cases.

It would take a lot of time to dive deep into the details to make a well-informed decision. For this
reason, I've decided to trust a major actor in the field (PlanetScale) and went with [their
recommendation](https://planetscale.com/blog/the-problem-with-using-a-uuid-primary-key-in-mysql).

On top of that, I've decided to add a prefix to the IDs to make it easier to identify which entity
the ID belongs to. This can be helpful when debugging.
