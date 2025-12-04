import SignInPage from "../../_components/SignInPage";
import { getSession } from "@/lib/auth";
import { redirect } from "next/navigation";

const SignIn = async () => {
  // Si l'utilisateur est déjà connecté, rediriger vers la page d'accueil
  const session = await getSession();
  if (session) {
    redirect("/");
  }

  return <SignInPage />;


};
export default SignIn;
