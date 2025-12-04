import StoryFormPage from "../../_components/StoryFormPage.jsx";
import { createStory } from "@/app/actions/story-actions";
import { getSession } from "@/lib/auth";
import { redirect } from "next/navigation";

const StoryForm = async () => {
   const session = await getSession();
   if (!session?.user) {
     redirect("/auth/signIn");
   }

  return <StoryFormPage formAction={createStory}  />;
};

export default StoryForm;
