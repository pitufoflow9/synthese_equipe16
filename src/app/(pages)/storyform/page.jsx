import StoryFormPage from "@/app/_components/StoryFormPage.jsx";
import { createStory } from "@/app/actions/story-actions";
import { getSession } from "@/lib/auth";
import { redirect } from "next/navigation";

const StoryForm = async () => {
  const session = await getSession();
  if (!session?.user) {
    redirect("/auth/signin");
  }

  return <StoryFormPage formAction={createStory} user={session.user} />;
};

export default StoryForm;
