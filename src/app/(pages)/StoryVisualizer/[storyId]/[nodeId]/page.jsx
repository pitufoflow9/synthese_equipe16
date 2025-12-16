import StoryVisualizerPage from "@/app/_components/StoryVisualizerPage.jsx";
import { getStoryInfoById, getNodeInfoById } from "@/app/_data/histoires.js";

export async function generateMetadata({ params }) {
  const { storyId } = await params;
  const storyInfo = await getStoryInfoById(storyId);
  return {
    title: "Lecture de " + storyInfo.title + " - Inkveil.",
  };
}

const NodeView = async ({ params }) => {
  const { storyId, nodeId } = await params;

  const storyInfo = await getStoryInfoById(storyId);
  const nodeData = await getNodeInfoById(nodeId);
  const story = {
    id: storyInfo.id,
    title: storyInfo.title,
    theme: storyInfo.theme,
    synopsis: storyInfo.synopsis,
    authorName: storyInfo.authorName,
    ambiance: storyInfo.ambiance,
    textEffect: storyInfo.textEffect,
  };

  const current = nodeData.node;
  const edges = nodeData.branches.map((branch) => ({
    id: branch.id,
    texte: branch.texte,
    type: branch.type,
    target: branch.targetNodeId,
  }));

  const isFirstNode = current.id === storyInfo.startNodeId;
  const isChoiceAsked = edges.length === 1;

  const isStoryEnd = current.is_ending === true;

  const isNodeTempCustom = !!current.is_node_temp_custom;
  const tempNodeAmbiance = current.temp_ambiance || null;
  const tempNodeTextEffect = current.temp_effect || null;
  const isNodeImg = !!current.is_node_img;
  const nodeImgUrl = current.temp_image_url || null;

  return (
    <StoryVisualizerPage
      story={story}
      current={current}
      edges={edges}
      storyId={storyId}
      ambiance={isNodeTempCustom ? tempNodeAmbiance || story.ambiance : story.ambiance}
      textEffect={isNodeTempCustom ? tempNodeTextEffect || story.textEffect : story.textEffect}
      isStoryEnd={isStoryEnd}
      isChoiceAsked={isChoiceAsked}
      isFirstNode={isFirstNode}
      isNodeTempCustom={isNodeTempCustom}
      tempNodeAmbiance={tempNodeAmbiance || story.ambiance}
      tempNodeTextEffect={tempNodeTextEffect || story.textEffect}
      isNodeImg={isNodeImg && !!nodeImgUrl}
      nodeImgUrl={nodeImgUrl}
    />
  );
};

export default NodeView;
