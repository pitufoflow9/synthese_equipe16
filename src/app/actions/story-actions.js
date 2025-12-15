"use server";
import { db } from "@/db";
import { Histoires, Nodes, Branches } from "@/db/schemas/schema";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { v4 as uuid } from "uuid";
import { eq, and } from "drizzle-orm";
import { auth } from "@/lib/auth";

export async function createStory(formData) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  const userId = session?.user?.id;
  if (!userId) {
    redirect("/auth/signin");
  }
  const titre = formData.get("titre")?.toString().trim();
  const synopsis = formData.get("synopsis")?.toString().trim();
  const banniere = formData.get("banniere")?.toString().trim() || null;
  const ambiance = formData.get("ambiance")?.toString().trim() || null;
  const textEffect = formData.get("textEffect")?.toString().trim() || null;
  console.log("createStory submit:", {
    banniere,
    ambiance,
    textEffect,
  });
  if (!titre || !synopsis) return;
  const storyId = uuid();

  await db.insert(Histoires).values({
    id: storyId,
    title: titre,
    synopsis,
    theme: banniere || null,
    musique: ambiance || null,
    animation: textEffect || null,
    creator_id: userId,
    is_published: false,
    created_at: new Date(),
  });

  await db.insert(Nodes).values({
    id: uuid(),
    histoire_id: storyId,
    type: "start",
    titre: "Depart",
    contenu: "",
    position_x: 0,
    position_y: 0,
    is_ending: false,
  });

  redirect(`/storyeditor/${storyId}`);
}

export async function updateStoryMeta(storyId, payload) {
  const updates = {
    title: payload.title,
    synopsis: payload.synopsis,
    is_published: payload.isPublished,
  };

  if ("theme" in payload) {
    updates.theme = payload.theme ?? null;
  }
  if ("ambiance" in payload || "musique" in payload) {
    updates.musique = payload.ambiance ?? payload.musique ?? null;
  }
  if ("textEffect" in payload || "animation" in payload) {
    updates.animation = payload.textEffect ?? payload.animation ?? null;
  }

  await db.update(Histoires).set(updates).where(eq(Histoires.id, storyId));
}

export async function createNode(storyId, node) {
  await db.insert(Nodes).values({
    id: node.id ?? uuid(),
    histoire_id: storyId,
    type: node.type ?? "story",
    titre: node.titre ?? "Nouveau noeud",
    contenu: node.contenu ?? "",
    is_node_temp_custom: node.isNodeTempCustom ?? false,
    is_node_img: node.isNodeImg ?? false,
    temp_ambiance: node.tempAmbiance ?? null,
    temp_effect: node.tempEffect ?? null,
    temp_image_url: node.tempImageUrl ?? null,
    position_x: node.position?.x ?? 0,
    position_y: node.position?.y ?? 0,
    is_ending: node.isEnding ?? false,
  });
}

export async function createEdge(storyId, edge) {
  await db.insert(Branches).values({
    id: edge.id ?? uuid(),
    histoire_id: storyId,
    source: edge.source,
    target: edge.target,
    texte: edge.texte ?? "",
    type: edge.edgeType ?? edge.type ?? "regular",
    history_key: edge.historyKey ?? null,
  });
}

export async function updateNodePosition(storyId, nodeId, position) {
  await db
    .update(Nodes)
    .set({ position_x: position.x, position_y: position.y })
    .where(and(eq(Nodes.id, nodeId), eq(Nodes.histoire_id, storyId)));
}

export async function updateNode(storyId, nodeId, payload) {
  const updates = {
    titre: payload.titre,
    contenu: payload.contenu,
    type: payload.type,
    is_ending: payload.isEnding,
  };

  if ("isNodeTempCustom" in payload) {
    updates.is_node_temp_custom = payload.isNodeTempCustom ?? false;
  }
  if ("isNodeImg" in payload) {
    updates.is_node_img = payload.isNodeImg ?? false;
  }
  if ("tempAmbiance" in payload) {
    updates.temp_ambiance = payload.tempAmbiance ?? null;
  }
  if ("tempEffect" in payload) {
    updates.temp_effect = payload.tempEffect ?? null;
  }
  if ("tempImageUrl" in payload) {
    updates.temp_image_url = payload.tempImageUrl ?? null;
  }

  await db
    .update(Nodes)
    .set(updates)
    .where(and(eq(Nodes.id, nodeId), eq(Nodes.histoire_id, storyId)));
}

export async function updateEdge(storyId, edgeId, payload) {
  await db
    .update(Branches)
    .set({
      texte: payload.texte,
      type: payload.edgeType,
      history_key: payload.historyKey,
    })
    .where(and(eq(Branches.id, edgeId), eq(Branches.histoire_id, storyId)));
}

export async function deleteEdge(storyId, edgeId) {
  await db
    .delete(Branches)
    .where(and(eq(Branches.id, edgeId), eq(Branches.histoire_id, storyId)));
}

export async function deleteNodeAndEdges(storyId, nodeId) {
  // supprimer les branches liees puis le noeud
  await db.delete(Branches).where(eq(Branches.source, nodeId));
  await db.delete(Branches).where(eq(Branches.target, nodeId));
  await db
    .delete(Nodes)
    .where(and(eq(Nodes.id, nodeId), eq(Nodes.histoire_id, storyId)));
}
