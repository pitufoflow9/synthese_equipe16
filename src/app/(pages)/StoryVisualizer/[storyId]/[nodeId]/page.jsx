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
  //Récupère le id de l'histoire et du noeud
  const { storyId, nodeId } = await params;

  // Récupère les info des histoire
  const storyInfo = await getStoryInfoById(storyId);
  // Récupère les info dans les noeuds et les branches
  const nodeData = await getNodeInfoById(nodeId);
  //Créé les données pour les afficher dans la page storyvisualization
  const story = {
    id: storyInfo.id,
    title: storyInfo.title,
    ambiance: storyInfo.ambiance,
    textEffect: storyInfo.textEffect,
  };
  //Le noeud que l'utilisateur lit en ce moment
  const current = nodeData.node;
  //Passer seulement le contenu utile à la page storyvisualization
  const edges = nodeData.branches.map(branch => ({
    id: branch.id,
    texte: branch.texte,
    type: branch.type,
    target: branch.targetNodeId,
  }));
  //Est-ce que c'est le premier node de l'histoire?
  const isFirstNode = (current.id === storyInfo.startNodeId);
  //Est-ce qu'il y a un choix à faire? (Sinon, ne pas afficher les choix, passer au prochains noeuds directement)
  const isChoiceAsked = edges.length === 1;
  //Est-ce que c'est le dernier noeud?
  const isStoryEnd = (current.is_ending === true);

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
      nodeImgUrl={nodeImgUrl || "../../../img/placeholder.png"}
    />
  );
};

export default NodeView;
