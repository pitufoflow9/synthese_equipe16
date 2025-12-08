import { GridProvider } from "@/app/_context/gridContext";
import StoryEditorPage from "@/app/_components/StoryEditorPage";
import { db } from "@/db";
import { Histoires, Nodes, Branches } from "@/db/schemas/schema";
import { eq } from "drizzle-orm";
import { notFound } from "next/navigation";

const mapNode = (n) => ({
  id: n.id,
  type: "default",
  position: { x: n.position_x ?? 0, y: n.position_y ?? 0 },
  data: {
    label: n.titre ?? "Sans titre",
    body: n.contenu ?? "",
    isEnding: !!n.is_ending,
    nodeType: n.type ?? "story",
  },
  draggable: n.type !== "start",
  selectable: true,
});

const mapEdge = (e) => ({
  id: e.id,
  source: e.source,
  target: e.target,
  label: e.texte ?? "",
  data: { edgeType: e.type ?? "regular", historyKey: e.history_key },
});

export default async function StoryEditorPageServer({ params }) {
  const resolvedParams = await params;
  const storyId = resolvedParams.id;

  const story = await db.query.Histoires.findFirst({
    where: eq(Histoires.id, storyId),
  });
  if (!story) return notFound();

  const nodes = (await db.select().from(Nodes).where(eq(Nodes.histoire_id, storyId))).map(mapNode);
  const edges = (await db.select().from(Branches).where(eq(Branches.histoire_id, storyId))).map(mapEdge);

  return (
    <GridProvider storyId={storyId} initialNodes={nodes} initialEdges={edges}>
      <StoryEditorPage story={story} />
    </GridProvider>
  );
}
