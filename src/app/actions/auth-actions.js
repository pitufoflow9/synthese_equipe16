"use server";

import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { headers } from "next/headers";
import { db } from "@/db";
import { user } from "@/db/schemas";
import { eq } from "drizzle-orm";

export async function signOut() {
  await auth.api.signOut({
    headers: await headers(),
  });
  redirect("/");
}

export async function signInWithEmail(formData) {
  const email = formData.get("email")?.toString().toLowerCase().trim();
  const password = formData.get("password")?.toString();

  if (!email || !password) {
    console.error("[signIn] Champs manquants pour la connexion");
    return;
  }

  const existingUser = await db
    .select({ id: user.id })
    .from(user)
    .where(eq(user.email, email))
    .limit(1);

  if (!existingUser.length) {
    console.error(`[signIn] Aucun utilisateur trouvé pour ${email}`);
    return;
  }

  await auth.api.signInEmail({
    body: { email, password },
    headers: await headers(),
  });

  redirect("/");
}

export async function signUpWithEmail(formData) {
  const name = formData.get("name")?.toString().trim();
  const email = formData.get("email")?.toString().toLowerCase().trim();
  const password = formData.get("password")?.toString();

  if (!name || !email || !password) {
    console.error("[signUp] Champs manquants pour l'inscription");
    return;
  }

  const existingUser = await db
    .select({ id: user.id })
    .from(user)
    .where(eq(user.email, email))
    .limit(1);

  if (existingUser.length) {
    console.error(`[signUp] Un utilisateur existe déjà pour ${email}`);
    return;
  }

  await auth.api.signUpEmail({
    body: { name, email, password },
    headers: await headers(),
  });

  redirect("/");
}
