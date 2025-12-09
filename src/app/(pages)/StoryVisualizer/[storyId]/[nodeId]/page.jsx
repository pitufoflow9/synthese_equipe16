import StoryVisualizerPage from "@/app/_components/StoryVisualizerPage.jsx";
import { getStoryInfoById, getNodeInfoById } from "@/app/_data/histoires.js";
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
  return (
    <StoryVisualizerPage
      story={story}
      current={current}
      edges={edges}
      storyId={storyId}
      ambiance={story.ambiance}
      textEffect={story.textEffect}
      isStoryEnd={isStoryEnd}
      isChoiceAsked={isChoiceAsked}
      isFirstNode={isFirstNode}
    />
  );
};

export default NodeView;
