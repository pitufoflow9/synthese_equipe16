"use client";
import AuthForm from "@/app/_components/AuthForm";
import { authClient } from "@/lib/auth-client";
import { useState } from "react";
import { useRouter } from "next/navigation";

const SignupClient = () => {
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const submitAction = async (formData) => {
    setError("");
    setIsLoading(true);
    
    const name = formData.get("name");
    const email = formData.get("email");
    const password = formData.get("password");

    const { data, error } = await authClient.signUp.email({
      name: name,
      email: email,
      password: password,
      callbackURL: "/",
    });
    
    if (error) {
      setError(error.message || "Une erreur est survenue lors de l'inscription");
      setIsLoading(false);
    } else {
      // Inscription réussie, rediriger vers la page d'accueil
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
        titre={"Inscription"}
        formAction={submitAction}
        showName={true}
        ctaTitle={isLoading ? "Inscription..." : "S'inscrire"}
      >
        <p className="text-center text-sm text-gray-300">
          Vous avez déjà un compte ?{" "}
          <a href="/auth/signIn" className="text-purple-400 hover:text-purple-300 hover:underline">
            Connectez-vous
          </a>
        </p>
      </AuthForm>
    </div>
  );
};
export default SignupClient;
