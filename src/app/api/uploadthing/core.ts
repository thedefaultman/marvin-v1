import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { createUploadthing, type FileRouter } from "uploadthing/next";
import { UploadThingError } from "uploadthing/server";
 
const f = createUploadthing();

 
// FileRouter for your app, can contain multiple FileRoutes
export const ourFileRouter = {
  // Define as many FileRoutes as you like, each with a unique routeSlug
  pdfUploader: f({ image: { maxFileSize: "4MB" } })
    // Set permissions and file types for this FileRoute
    .middleware(async ({ req }) => {
      
        const { getUser } = getKindeServerSession()
        const user = await getUser()

        if(!user || !user.id) throw new Error("UNAUTHORIZED")

        return {useId: user.id};
    })
    .onUploadComplete(async ({ metadata, file }) => {}),
} satisfies FileRouter;
 
export type OurFileRouter = typeof ourFileRouter;