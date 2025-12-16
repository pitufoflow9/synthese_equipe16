import { randomUUID } from "crypto";
import { createUploadthing } from "uploadthing/next";

import { db } from "@/db";
import { UserImages } from "@/db/schemas/schema";
import { auth } from "@/lib/auth";

const f = createUploadthing();

const authenticateRequest = async (req) => {
  try {
    const session = await auth.api.getSession({
      headers: req?.headers,
    });
    if (session?.user?.id) {
      return { id: session.user.id };
    }
  } catch (error) {
    console.error("Upload auth error", error);
  }
  return { id: "anonymous" };
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
      return { userId: user.id };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      const fileUrl = file.ufsUrl;
      const description = file.name ?? "Image televersee";

      try {
        if (metadata.userId && metadata.userId !== "anonymous") {
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
