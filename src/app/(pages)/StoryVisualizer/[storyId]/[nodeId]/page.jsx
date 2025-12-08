import { notFound } from "next/navigation";
import StoryVisualizerPage from "@/app/_components/StoryVisualizerPage.jsx";
import { getStoryInfoById, getNodeInfoById } from "@/app/_data/histoires.js";

const NodeView = async ({ params }) => {
  //Récupère le id de l'histoire et du noeud
  const { storyId, nodeId } = await params;

  // Récupère les info des histoire
  const storyInfo = await getStoryInfoById(storyId);
  if (!storyInfo) return notFound();

  // Récupère les info dans les noeuds et les branches
  const nodeData = await getNodeInfoById(nodeId);
  console.log(nodeData);
  if (!nodeData) return notFound();

  //Créé les données pour les afficher dans la page storyvisualization
  const story = {
    id: storyInfo.id,
    title: storyInfo.title,
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
      isStoryEnd={isStoryEnd}
      isChoiceAsked={isChoiceAsked}
    />
  );
};

export default NodeView;
