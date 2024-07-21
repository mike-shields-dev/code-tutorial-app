import { serial, text, integer, pgSchema, unique } from "drizzle-orm/pg-core";

export const schema = pgSchema("schema");

export const tutorials = schema.table('tutorials', {
    id: serial('id').primaryKey(),
    title: text('title').notNull().unique(),
});

export const lessons = schema.table("lessons", {
    id: serial('id').primaryKey(),
    title: text('title').notNull().unique(),
})

export const topics = schema.table('topics', {
    id: serial('id').primaryKey(),
    name: text('name').notNull().unique(),
})

export const tutorial_topics = schema.table('tutorial_topics', {
    tutorial_id: integer('tutorial_id')
        .notNull()
        .references(() => tutorials.id, { onDelete: 'cascade' }), // Will be deleted if the tutorial is deleted
    topic_id: integer('topic_id')
        .notNull()
        .references(() => topics.id, { onDelete: 'cascade' }), // Will be deleted if the topic is deleted
}, (tutorial_topics) => ({
    unique_foreign_keys: unique().on(tutorial_topics.tutorial_id, tutorial_topics.topic_id),
}));
