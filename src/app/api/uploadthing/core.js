import { randomUUID } from "crypto";
import { createUploadthing } from "uploadthing/next";
import { UploadThingError } from "uploadthing/server";

import { db } from "@/db";
import { UserImages } from "@/db/schemas/schema";
import { auth } from "@/lib/auth";

const f = createUploadthing();

const authenticateRequest = async (req) => {
  const session = await auth.api.getSession({
    headers: req?.headers,
  });
  return session?.user ? { id: session.user.id } : null;
};

export const ourFileRouter = {
  imageUploader: f({
    image: {
      maxFileSize: "4MB",
      maxFileCount: 1,
    },
  })
    .middleware(async ({ req }) => {
      const user = await authenticateRequest(req);
      if (!user) {
        throw new UploadThingError("Unauthorized");
      }
      return { userId: user.id };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      const fileUrl = file.ufsUrl;
      const description = file.name ?? "Image televersee";

      try {
        if (metadata.userId) {
          await db.insert(UserImages).values({
            id: randomUUID(),
            user_id: metadata.userId,
            url: fileUrl,
            description,
            created_at: new Date(),
          });
        }
      } catch (error) {
        console.error("Failed to persist uploaded image (continuing anyway)", error);
      }

      console.log("Upload complete for userId:", metadata.userId);
      console.log("file url", fileUrl);
      return {
        uploadedBy: metadata.userId,
        fileUrl,
        ufsUrl: fileUrl,
        fileKey: file.key,
      };
    }),
};

export default ourFileRouter;
