import UserPage from "@/app/_components/UserPage.jsx";
import { getPublishedByAuthor } from "@/app/_data/histoires.js";
import { getUserById } from "@/app/_data/users.js";

export async function generateMetadata({ params }) {
  const author = await getUserById(params.slug);
  const authorName = author?.name || "Auteur inconnu";
  return {
    title: `${authorName} - Inkveil`,
    description: `Histoires publiées par ${authorName}`,
  };
}

const UserProfilePage = async ({ params }) => {
  const authorId = params.slug;

  const [author, storiesRaw] = await Promise.all([
    getUserById(authorId),
    getPublishedByAuthor(authorId),
  ]);

  const displayName = author?.name || "Auteur inconnu";
  const profileImage = author?.image || "../../../img/account_icon.svg";
  const stories =
    storiesRaw?.map((story) => ({
      id: story.id,
      title: story.title,
      synopsis: story.synopsis,
      theme: story.theme,
    })) ?? [];

  return (
    <UserPage
      displayName={displayName}
      profileImage={profileImage}
      stories={stories}
    />
  );
};

export default UserProfilePage;
