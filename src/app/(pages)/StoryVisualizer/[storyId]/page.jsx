import { db } from "@/db";
import { Histoires, Nodes } from "@/db/schemas/schema";
import { eq } from "drizzle-orm";
import { redirect, notFound } from "next/navigation";

export default async function StoryStart({ params }) {
  const resolvedParams = await params;
  const storyId = resolvedParams.storyId;
  const story = await db.query.Histoires.findFirst({
    where: eq(Histoires.id, storyId),
  });
  if (!story || !story.is_published) return notFound();

  const nodes = await db
    .select()
    .from(Nodes)
    .where(eq(Nodes.histoire_id, storyId));

  if (!nodes.length) return notFound();

  const startNode =
    nodes.find((node) => node.type === "start") ?? nodes[0] ?? null;

  if (!startNode) return notFound();

  redirect(`/storyvisualizer/${storyId}/${startNode.id}`);
}
