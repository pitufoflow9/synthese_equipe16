import "server-only";
import { db } from "@/db";
import { user } from "@/db/schemas/auth-schema";
import { eq } from "drizzle-orm";

export async function getUserById(id) {
  if (!id) return null;
  const [row] = await db.select().from(user).where(eq(user.id, id)).limit(1);
  return row ?? null;
}
