"use client";

import "../_components/Nav.css";
import "../_components/Footer.css";
import "../_components/MainPageClient.css";
import "../_components/SignUpInPage.css";

import Footer from "./Footer.jsx";
import Nav from "./Nav.jsx";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";

const UserAccountPage = ({
  titre = "S'inscrire",
  showName = true,
  ctaTitle = "S'inscrire",
  ctaGithub = "S'inscrire avec Github",
  children,
}) => {
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const submitAction = async (formData) => {
    setError("");
    setIsLoading(true);

    try {
      const name = formData.get("name");
      const email = formData.get("email");
      const password = formData.get("password");

      const { error } = await authClient.signUp.email({
        name: name,
        email: email,
        password: password,
        callbackURL: "/",
      });

      if (error) {
        throw new Error(
          error.message || "Une erreur est survenue lors de l'inscription"
        );
      }

      router.push("/");
      router.refresh();
    } catch (err) {
      setError(err?.message || "Une erreur est survenue lors de l'inscription");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    await submitAction(formData);
  };

  return (
    <div className="page-container">
      <img className="bg" src="../../../img/Background_3.jpg" alt="" />
      <Nav />
      <div className="flex-container">
        <h1 className="sign-in-up-h1">
          L'histoire
          <br />
          commence <br />
          ici.
        </h1>
        <form className="user-form" onSubmit={handleSubmit}>
          <h1 className="h1-user-form">{titre}</h1>
          <h2 className="h2-user-form">
            Débutez la création et l'exploration d'histoires.
          </h2>
          {showName && (
            <div className="form-input-container">
              <label htmlFor="fld_name">Nom complet</label>
              <input
                id="fld_name"
                name="name"
                placeholder="Entrez votre nom"
                required
              ></input>
            </div>
          )}
          <div className="form-input-container">
            <label htmlFor="fld_email">Adresse courriel</label>
            <input
              id="fld_email"
              name="email"
              placeholder="exemple@email.com"
              required
              rows={1}
            ></input>
          </div>
          <div className="form-input-container">
            <label htmlFor="fld_password">Mot de passe</label>
            <input
              id="fld_password"
              type="password"
              name="password"
              placeholder="********"
              required
            ></input>
          </div>
          <button
            type="submit"
            className="btn-form btn-form-sign-up"
            aria-busy={isLoading}
          >
            {isLoading ? "Inscription..." : ctaTitle}
          </button>
          <hr className="user-form-hr" />
          <button type="button" className="btn-form btn-form-github">
            <img
              className="github-logo"
              src="../../../img/github_logo.png"
              alt=""
            />{" "}
            {ctaGithub}
          </button>
          {error && (
            <p
              role="alert"
              style={{ color: "red", textAlign: "center", marginTop: "10px" }}
            >
              {error}
            </p>
          )}
          {children}
          <Link href="/auth/signin" className="switch-form">
            Vous avez déjà un compte?{" "}
            <span className="btn-switch-form">Se connecter</span>
          </Link>
        </form>
      </div>
      <Footer />
    </div>
  );
};

export default UserAccountPage;

