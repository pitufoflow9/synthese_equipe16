"use client";

import "../_components/Nav.css"
import "../_components/Footer.css"
import "../_components/MainPageClient.css"
import "../_components/StoryFormPage.css"

import Footer from "./Footer.jsx"
import Nav from "./Nav.jsx"

const StoryFormPage = () => {
    return (
        <div className="story-form-container">
            <img className="bg" src="../../../img/blue-purple_gradient.png" alt="" />
            <Nav />

            <h1 className="h1-story-form">Nouvelle histoire</h1>
            <form className="story-form" >
                <div className="form-input-container title-input">
                    <label htmlFor="title">Titre</label>
                    <textarea
                        id="title"
                        className="title"
                        placeholder="Écrire..."
                        required
                        rows={1}
                    ></textarea>
                </div>
                <div className="form-input-container synopsis-input">
                    <label htmlFor="synopsis">Synopsis</label>
                    <textarea
                        id="synopsis"
                        placeholder="Écrire..."
                        required
                        rows={3}
                    ></textarea>
                </div>

                <button className="btn-form btn-form-banner-img" >
                    Choisir une image de bannière
                </button>
                <button className="btn-form btn-form-add-music" >
                    <span className="material-symbols-outlined music-icon">
                        music_note
                    </span>
                    Ajouter une musique
                </button>

                <hr className="story-form-hr" />

                <button className="btn-form btn-form-continue" >
                    Continuer
                </button>


            </form>
            <div>
            </div>
            {/* <Footer /> */}
        </div>
    )
}

export default StoryFormPage;