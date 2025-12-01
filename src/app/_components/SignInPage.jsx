"use client";

import "../_components/Nav.css";
import "../_components/Footer.css";
import "../_components/MainPageClient.css";
import "../_components/SignUpInPage.css";

import Link from "next/link";
import Footer from "./Footer.jsx";
import Nav from "./Nav.jsx";

const UserAccountPage = ({
  titre = "Se connecter",
  formAction,
  showName,
  ctaTitle = "Se connecter",
  ctaGithub = "Se connecter avec Github",
  children,
}) => {
  return (
    <div className="page-container">
      <img className="bg" src="../../../img/blue-purple_gradient.png" alt="" />
      <Nav />
      <div className="flex-container">
        <h1 className="sign-in-up-h1">
          L'histoire
          <br />
          commence <br />
          ici.
        </h1>
        <form className="user-form" action={formAction}>
          <h1 className="h1-user-form">{titre}</h1>
          <h2 className="h2-user-form">
            Connectez-vous pour débuter la création et l'exploration
            d'histoires.
          </h2>
          {showName && (
            <div className="form-input-container">
              <label htmlFor="fld_name">Nom complet</label>
              <input
                id="fld_name"
                name="name"
                className="title"
                placeholder="Entrez votre nom"
                required
                rows={1}
              ></input>
            </div>
          )}

          <div className="form-input-container">
            <label htmlFor="fld_email">Adresse courriel</label>
            <input
              id="fld_email"
              name="email"
              className="title"
              placeholder="exemple@email.com"
              required
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

          <button type="submit" className="btn-form btn-form-sign-in">
            {ctaTitle}
          </button>

          <hr className="user-form-hr" />

          <button type="button" className="btn-form btn-form btn-form-github">
            <img
              className="github-logo"
              src="../../../img/github_logo.png"
              alt=""
            />{" "}
            {ctaGithub}
          </button>

          {children}
          <Link href="/auth/signUp" className="switch-form">
            Vous n'avez pas de compte?{" "}
            <span className="btn-switch-form">S'inscrire</span>
          </Link>
        </form>
      </div>
      <Footer />
    </div>
  );
};

export default UserAccountPage;
