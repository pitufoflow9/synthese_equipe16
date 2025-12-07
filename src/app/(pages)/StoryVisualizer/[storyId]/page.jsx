import { db } from "@/db";
import { Histoires, Nodes } from "@/db/schemas/schema";
import { eq, and } from "drizzle-orm";
import { redirect, notFound } from "next/navigation";


//J'ai chang quelques trucs pour que ca fonctionne, feel free de les enlever si c'est pas comme ca que vous devez le faire.
export default async function StoryStart({ params }) {
  //Ajouté (Alex)
  const { storyId } = await params;
  const story = await db.query.Histoires.findFirst({
    //Changé (Alex)
    where: eq(Histoires.id, storyId),
    // where: eq(Histoires.id, params.storyId),
  });
  if (!story || !story.is_published) return notFound();

  const startNode = await db
    .select()
    .from(Nodes)
    //Changé (Alex)
    // .where(and(eq(Nodes.histoire_id, params.storyId), eq(Nodes.type, "start")))
    .where(and(eq(Nodes.histoire_id, storyId), eq(Nodes.type, "start")))
    .limit(1);

  if (!startNode.length) return notFound();
  //Changé (Alex)
  // redirect(`/storyvisualizer/${params.storyId}/${startNode[0].id}`);
  redirect(`/storyvisualizer/${storyId}/${startNode[0].id}`); // Changed
}
