"use client";
import "../_components/Nav.css";
import "../_components/Footer.css";
import "../_components/MainPageClient.css";
import "../_components/StoryFormPage.css";
import Footer from "./Footer.jsx";
import Nav from "./Nav.jsx";

const StoryFormPage = ({ formAction, initial = {} }) => {
  return (
    <div className="story-form-container">
      <img className="bg" src="../../../img/blue-purple_gradient.png" alt="" />
      <Nav />
      <h1 className="h1-story-form">Nouvelle histoire</h1>
      <form className="story-form" action={formAction}>
        {initial.id && <input type="hidden" name="id" value={initial.id} />}
        <div className="form-input-container title-input">
          <label htmlFor="title">Titre</label>
          <input
            id="title"
            name="titre"
            className="title"
            placeholder="Écrire..."
            defaultValue={initial.titre}
            required
          />
        </div>
        <div className="form-input-container synopsis-input">
          <label htmlFor="synopsis">Synopsis</label>
          <textarea
            id="synopsis"
            name="synopsis"
            placeholder="Écrire..."
            rows={3}
            defaultValue={initial.synopsis}
            required
          />
        </div>
        <button type="submit" className="btn-form btn-form-continue">
          Continuer
        </button>
      </form>
      <Footer />
    </div>
  );
};

export default StoryFormPage;
