import "server-only";
import { db } from "@/db";
import { Histoires, Nodes, Branches } from "@/db/schemas/schema";
import { and, desc, eq } from "drizzle-orm";
import { user } from "@/db/schemas/auth-schema";

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
    .where(
      and(eq(Histoires.creator_id, authorId), eq(Histoires.is_published, true))
    );
}

export async function getRecentPublished(limit = 6) {
  return db
    .select()
    .from(Histoires)
    .where(eq(Histoires.is_published, true))
    .orderBy(desc(Histoires.created_at))
    .limit(limit);
}

export async function getStoryGraph(storyId) {
  const nodes = await db
    .select()
    .from(Nodes)
    .where(eq(Nodes.histoire_id, storyId));
  const edges = await db
    .select()
    .from(Branches)
    .where(eq(Branches.histoire_id, storyId));
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

// Fonctions simplifiées (approche débutant)
export async function getPublishedStories() {
  return db
    .select()
    .from(Histoires)
    .where(eq(Histoires.is_published, true))
    .orderBy(desc(Histoires.created_at));
}

export async function getStoryInfoById(storyId) {
  // Histoire
  const [story] = await db
    .select()
    .from(Histoires)
    .where(eq(Histoires.id, storyId));
  if (!story || !story.is_published) return null;

  // Auteur
  let authorName = null;
  if (story.creator_id) {
    const [author] = await db
      .select()
      .from(user)
      .where(eq(user.id, story.creator_id));
    authorName = author?.name ?? null;
  }

  // Node de départ
  const [startNode] = await db
    .select({ id: Nodes.id })
    .from(Nodes)
    .where(and(eq(Nodes.histoire_id, storyId), eq(Nodes.type, "start")))
    .limit(1);

  let startNodeId = startNode?.id ?? null;
  if (!startNodeId) {
    const [firstNode] = await db
      .select({ id: Nodes.id })
      .from(Nodes)
      .where(eq(Nodes.histoire_id, storyId))
      .limit(1);
    startNodeId = firstNode?.id ?? null;
  }

  return {
    id: story.id,
    title: story.title,
    synopsis: story.synopsis,
    isPublished: story.is_published,
    authorId: story.creator_id,
    authorName,
    startNodeId,
  };
}

export async function getNodeInfoById(nodeId) {
  // Node
  const [node] = await db.select().from(Nodes).where(eq(Nodes.id, nodeId));
  if (!node) return null;

  // Branches sortantes
  const branches = await db
    .select({
      id: Branches.id,
      texte: Branches.texte,
      type: Branches.type,
      targetNodeId: Branches.target,
    })
    .from(Branches)
    .where(eq(Branches.source, nodeId));

  return { node, branches };
}
