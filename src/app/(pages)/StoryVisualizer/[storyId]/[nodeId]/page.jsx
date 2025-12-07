import { db } from "@/db";
import { Histoires, Nodes, Branches } from "@/db/schemas/schema";
import { and, eq, inArray } from "drizzle-orm";
import { notFound } from "next/navigation";
import StoryVisualizerPage from "../../../../_components/StoryVisualizerPage.jsx";

export default async function NodeView({ params }) {
  const storyId = params.storyId;
  const nodeId = params.nodeId;

  const story = await db.query.Histoires.findFirst({
    where: eq(Histoires.id, storyId),
  });
  if (!story || !story.is_published) return notFound();

  const node = await db.query.Nodes.findFirst({
    where: and(eq(Nodes.histoire_id, storyId), eq(Nodes.id, nodeId)),
  });
  if (!node) return notFound();

  const edges = await db
    .select({
      id: Branches.id,
      source: Branches.source,
      target: Branches.target,
      texte: Branches.texte,
      type: Branches.type,
      history_key: Branches.history_key,
    })
    .from(Branches)
    .where(eq(Branches.source, nodeId));

  const targetIds = edges.map((edge) => edge.target).filter(Boolean);
  let targetLookup = {};

  if (targetIds.length) {
    const targets = await db
      .select({
        id: Nodes.id,
        titre: Nodes.titre,
        isEnding: Nodes.is_ending,
      })
      .from(Nodes)
      .where(inArray(Nodes.id, targetIds));

    targetLookup = Object.fromEntries(
      targets.map((target) => [
        target.id,
        { titre: target.titre, isEnding: target.isEnding },
      ])
    );
  }

  const branches = edges.map((edge) => ({
    ...edge,
    targetTitle: targetLookup[edge.target]?.titre ?? null,
    isTargetEnding: targetLookup[edge.target]?.isEnding ?? false,
  }));

  return (
    <StoryVisualizerPage
      storyTitle={story.title}
      storyId={story.id}
      nodeTitle={node.titre}
      nodeContent={node.contenu}
      branches={branches}
      isEnding={node.is_ending}
    />
  );
}
