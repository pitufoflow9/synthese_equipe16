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
    .where(and(eq(Histoires.creator_id, authorId), eq(Histoires.is_published, true)));
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
export async function getPublishedStories() {
  return db
    .select()
    .from(Histoires)
    .where(eq(Histoires.is_published, true))
    .orderBy(desc(Histoires.created_at));
}

// Infos d’une histoire + auteur + node de départ
export async function getStoryInfoById(storyId) {
  const [story] = await db
    .select({
      id: Histoires.id,
      title: Histoires.title,
      synopsis: Histoires.synopsis,
      authorId: Histoires.creator_id,
      authorName: user.name,
      startNodeId: Nodes.id, // node de départ (type "start")
    })
    .from(Histoires)
    .leftJoin(user, eq(user.id, Histoires.creator_id))
    .leftJoin(
      Nodes,
      and(eq(Nodes.histoire_id, Histoires.id), eq(Nodes.type, "start"))
    )
    .where(eq(Histoires.id, storyId))
    .limit(1);

  if (!story) return null;

  // Fallback si aucun node de type "start"
  if (!story.startNodeId) {
    const fallback = await db
      .select({ startNodeId: Nodes.id })
      .from(Nodes)
      .where(eq(Nodes.histoire_id, storyId))
      .orderBy(Nodes.position_x) // ou created_at si tu préfères
      .limit(1);
    story.startNodeId = fallback?.[0]?.startNodeId ?? null;
  }

  return story;
}

// Infos d’un node + branches sortantes + id des cibles
export async function getNodeInfoById(nodeId) {
  const [node] = await db.select().from(Nodes).where(eq(Nodes.id, nodeId));
  if (!node) return null;

  const TargetNode = alias(Nodes, "targetNode");
  const branches = await db
    .select({
      id: Branches.id,
      texte: Branches.texte,
      type: Branches.type,
      targetNodeId: Branches.target,
      targetTitle: TargetNode.titre,
      targetType: TargetNode.type,
    })
    .from(Branches)
    .leftJoin(TargetNode, eq(TargetNode.id, Branches.target))
    .where(eq(Branches.source, nodeId));

  return { node, branches };
}
