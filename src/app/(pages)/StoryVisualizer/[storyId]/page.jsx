import { redirect, notFound } from "next/navigation";
import { getStoryInfoById } from "@/app/_data/histoires.js";

const StoryStart = async ({ params }) => {
  const { storyId } = await params;
  const storyInfo = await getStoryInfoById(storyId);
  
  redirect("/storyvisualizer/" + storyId + "/" + storyInfo.startNodeId);
};

export default StoryStart;
