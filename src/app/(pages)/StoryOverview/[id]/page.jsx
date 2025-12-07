import { notFound } from "next/navigation";
import StoryOverviewPage from "../../../_components/StoryOverviewPage.jsx";
import { getStoryInfoById } from "../../../_data/histoires.js";

const StoryOverview = async ({ params }) => {
  const storyId = (await params)?.id;
  const story = await getStoryInfoById(storyId);
  if (!story) return notFound();

  return <StoryOverviewPage story={story} />;
};

export default StoryOverview;
