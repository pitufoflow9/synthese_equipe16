import { db } from "@/db";
import { Histoires, Nodes, Branches } from "@/db/schemas/schema";
import { eq, and } from "drizzle-orm";
import { notFound } from "next/navigation";

export default async function NodeView({ params }) {
  const story = await db.query.Histoires.findFirst({
    where: eq(Histoires.id, params.storyId),
  });
  if (!story || !story.is_published) return notFound();

  const node = await db
    .select()
    .from(Nodes)
    .where(and(eq(Nodes.histoire_id, params.storyId), eq(Nodes.id, params.nodeId)))
    .limit(1);
  if (!node.length) return notFound();

  const edges = await db
    .select()
    .from(Branches)
    .where(eq(Branches.source, params.nodeId));

  const current = node[0];

  return (
    <div style={{ padding: 24 }}>
      <h1>{story.title}</h1>
      <h2>{current.titre || "Étape"}</h2>
      <p>{current.contenu || "Contenu du nœud"}</p>

      {edges.length === 0 && <p>Fin de l'histoire.</p>}

      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        {edges.map((edge) => (
          <a
            key={edge.id}
            href={`/storyVisualizer/${params.storyId}/${edge.target}`}
            style={{ padding: 8, border: "1px solid #ccc", borderRadius: 4 }}
          >
            {edge.texte || "Choix"}
          </a>
        ))}
      </div>
    </div>
  );
}
