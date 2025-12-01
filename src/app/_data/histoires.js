import "server-only";
import { db } from "@/db";
import { Histoires, Nodes, Branches } from "@/db/schemas/schema";
import { eq, and } from "drizzle-orm";

export async function getHistoires() {
  return db.select().from(Histoires);
}

export async function getHistoireById(id) {
  const [row] = await db.select().from(Histoires).where(eq(Histoires.id, id));
  return row || null;
}

export async function getPublishedByAuthor(authorId) {
  return db
    .select()
    .from(Histoires)
    .where(and(eq(Histoires.creator_id, authorId), eq(Histoires.is_published, true)));
}

export async function getStoryGraph(storyId) {
  const nodes = await db.select().from(Nodes).where(eq(Nodes.histoire_id, storyId));
  const edges = await db.select().from(Branches).where(eq(Branches.histoire_id, storyId));
  return { nodes, edges };
}

export async function ajouterHistoires(histoire) {
  return db.insert(Histoires).values({
    id: histoire.id,
    title: histoire.titre,
    synopsis: histoire.synopsis,
    theme: histoire.banniere || null,
    musique: histoire.musique || null,
    creator_id: histoire.creator_id || null,
    is_published: false,
    created_at: Date.now(),
  });
}

export async function deleteHistoire(id) {
  return db.delete(Histoires).where(eq(Histoires.id, id));
}

export async function updateHistoire(id, payload) {
  return db
    .update(Histoires)
    .set({
      title: payload.titre,
      synopsis: payload.synopsis,
      theme: payload.banniere || null,
      musique: payload.musique || null,
      is_published: payload.is_published ?? false,
    })
    .where(eq(Histoires.id, id));
}
