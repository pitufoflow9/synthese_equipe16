import SignupClient from "./SignupClient";
import { getSession } from "@/lib/auth";
import { redirect } from "next/navigation";

const SignUpPage = async () => {
  // Si l'utilisateur est déjà connecté, rediriger vers la page d'accueil
  const session = await getSession();
  if (session) {
    redirect("/");
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-purple-900 to-black px-4">
      <SignupClient />
    </div>
  );
};
export default SignUpPage;
