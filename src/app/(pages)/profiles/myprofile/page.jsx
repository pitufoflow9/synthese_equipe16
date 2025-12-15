import MyProfilePage from "@/app/_components/MyProfilePage.jsx";
import { getSession } from "@/lib/auth";
import { getStoriesByAuthor } from "@/app/_data/histoires.js";

export async function generateMetadata({ params }) {
  return {
    title: "Mon profil - Inkveil.",
  };
}

const MyProfile = async () => {
  const session = await getSession();
  const userId = session?.user?.id || null;
  const userName = session?.user?.name || "Mon profil";
  const profileImage =
    session?.user?.image || "../../../img/account_icon.svg";

  let stories = [];
  if (userId) {
    stories = await getStoriesByAuthor(userId);
  }

  const publishedStories = stories.filter((story) => story.isPublished);
  const draftStories = stories.filter((story) => !story.isPublished);

  return (
    <MyProfilePage
      userName={userName}
      profileImage={profileImage}
      publishedStories={publishedStories}
      draftStories={draftStories}
    />
  );
};

export default MyProfile;
