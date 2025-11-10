"use client";
import AuthForm from "@/app/_components/AuthForm";
import { authClient } from "@/lib/auth-client";
import { useState } from "react";
import { useRouter } from "next/navigation";

const SignInClient = () => {
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const submitAction = async (formData) => {
    setError("");
    setIsLoading(true);
    
    const email = formData.get("email");
    const password = formData.get("password");

    const { data, error } = await authClient.signIn.email({
      email,
      password,
      callbackURL: "/",
    });
    
    if (error) {
      setError(error.message || "Une erreur est survenue lors de la connexion");
      setIsLoading(false);
    } else {
      // Connexion réussie, rediriger vers la page d'accueil
      router.push("/");
      router.refresh();
    }
  };

  return (
    <div className="w-full max-w-md">
      {error && (
        <div className="mb-4 p-4 bg-red-900/30 border border-red-500 text-red-300 rounded-xl backdrop-blur-sm">
          {error}
        </div>
      )}
      <AuthForm
        titre="Connexion"
        showName={false}
        formAction={submitAction}
        ctaTitle={isLoading ? "Connexion..." : "Se connecter"}
      >
        <p className="text-center text-sm text-gray-300">
          Vous voulez créer un compte ?{" "}
          <a href="/auth/signup" className="text-purple-400 hover:text-purple-300 hover:underline">
            Inscrivez-vous
          </a>
        </p>
      </AuthForm>
    </div>
  );
};
export default SignInClient;
