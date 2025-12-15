import { db } from "@/db";
import { UserImages } from "@/db/schemas/schema";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { eq, desc } from "drizzle-orm";

export async function GET() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const userId = session?.user?.id;
  if (!userId) {
    return new Response("Unauthorized", { status: 401 });
  }

  const images = await db
    .select()
    .from(UserImages)
    .where(eq(UserImages.user_id, userId))
    .orderBy(desc(UserImages.created_at));

  return Response.json({ images });
}
