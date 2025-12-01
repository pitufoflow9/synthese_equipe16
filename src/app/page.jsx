import MainPageClient from "./_components/MainPageClient";
import { GridProvider } from "./_context/gridContext";
import { getSession } from "@/lib/auth";

export const metadata = {
  title: "Web 5",
  description: "Gabarit de départ - Web 5",
};

const HomePage = async () => {
  if (!process.env.BETTER_AUTH_SECRET?.trim()) {
    console.log(
      "[ASSUREZ-VOUS DE FOURNIR UN BETTER_AUTH_SECRET DANS LE FICHIER .ENV]",
      "https://www.better-auth.com/docs/installation"
    );

    // DB: GENERATE
    // DB: MIGRATE
  }

  // récupérer plutôt ces deux tableaux depuis un DataLayer
  const initialNodes = [
    {
      id: "id-un",
      position: { x: 0, y: 0 },
      deletable: false,
      draggable: false,
    },
    { id: "id-deux", position: { x: 0, y: 70 } },
    { id: "id-trois", position: { x: 200, y: 0 } },
  ];
  const initialEdges = [{ id: "edge-un", source: "id-un", target: "id-deux" }];

  const session = await getSession();
  console.log("[session]", session);
  const displayName = session?.user?.name || "Invité";
  console.log(
    session
      ? `Utilisateur connecté: ${displayName}`
      : "Utilisateur déconnecté (invité)"
  );

  // Consulter la composante GridProvider

  return (
    <GridProvider initialNodes={initialNodes} initialEdges={initialEdges}>
      <main className="">
        {/* <main className="flex flex-col items-center justify-center gap-2 py-5"> */}
        {/* <h1>Gabarit de départ</h1> */}
        <MainPageClient displayName={displayName} />
      </main>
    </GridProvider>
  );
};
export default HomePage;
