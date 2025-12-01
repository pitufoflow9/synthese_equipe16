import { db } from "@/db";
import { Histoires, Nodes } from "@/db/schemas/schema";
import { eq, and } from "drizzle-orm";
import { redirect, notFound } from "next/navigation";

export default async function StoryStart({ params }) {
  const story = await db.query.Histoires.findFirst({
    where: eq(Histoires.id, params.storyId),
  });
  if (!story || !story.is_published) return notFound();

  const startNode = await db
    .select()
    .from(Nodes)
    .where(and(eq(Nodes.histoire_id, params.storyId), eq(Nodes.type, "start")))
    .limit(1);

  if (!startNode.length) return notFound();

  redirect(`/storyVisualizer/${params.storyId}/${startNode[0].id}`);
}
