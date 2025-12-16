import { NextResponse } from "next/server";
import { db } from "@/db";
import { Histoires } from "@/db/schemas/schema";
import { eq, sql } from "drizzle-orm";
import { getSession } from "@/lib/auth";

export async function POST(_request, { params }) {
  const session = await getSession();
  if (!session?.user?.id) {
    return NextResponse.json(
      { error: "Non authentifie." },
      { status: 401 }
    );
  }

  const storyId = params?.id;
  if (!storyId) {
    return NextResponse.json(
      { error: "Identifiant d'histoire manquant." },
      { status: 400 }
    );
  }

  const [updated] = await db
    .update(Histoires)
    .set({ dislikes: sql`${Histoires.dislikes} + 1` })
    .where(eq(Histoires.id, storyId))
    .returning({
      id: Histoires.id,
      likes: Histoires.likes,
      dislikes: Histoires.dislikes,
    });

  if (!updated) {
    return NextResponse.json(
      { error: "Histoire introuvable." },
      { status: 404 }
    );
  }

  return NextResponse.json(updated);
}
