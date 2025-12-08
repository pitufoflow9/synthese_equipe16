import { redirect, notFound } from "next/navigation";
import { getStoryInfoById } from "@/app/_data/histoires.js";

const StoryStart = async ({ params }) => {
  //Récupère le id de l'histoire
  const { storyId } = await params;

  //Récupère tout les infos de l'histoire depuis son id
  const storyInfo = await getStoryInfoById(storyId);
  if (!storyInfo) return notFound();

  //construit l'url pour afficher l'histoire dans la page storyvisualizer
  redirect("/storyvisualizer/" + storyId + "/" + storyInfo.startNodeId);
};

export default StoryStart;
