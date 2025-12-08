import { notFound } from "next/navigation";
import StoryOverviewPage from "@/app/_components/StoryOverviewPage.jsx";
import { getStoryInfoById } from "@/app/_data/histoires.js";

const StoryOverview = async ({ params }) => {
  const storyId = (await params)?.id;
  const story = await getStoryInfoById(storyId);
  if (!story) return notFound();

  return <StoryOverviewPage story={story} />;
};

export default StoryOverview;
