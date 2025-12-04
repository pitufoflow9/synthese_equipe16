"use client";

import "../_components/Nav.css";
import "../_components/Footer.css";
import "../_components/MainPageClient.css";
import "../_components/StoryFormPage.css";
import { useEffect, useState, useRef } from "react";
import Footer from "./Footer.jsx";
import Nav from "./Nav.jsx";
import { X } from "lucide-react";
import { Music3 } from "lucide-react";

// TODO: Intégrer la logique de la création de l'histoire (Titre, synopsis, image de bannière, musique).
// TODO: (APRES L'ALPHA) : Pouvoir téléverser une image de bannière et/ou musique.
// TODO (ALEX): (APRES L'ALPHA) : Créer la page de téléversement d'images/musiques.

const StoryFormPage = ({ formAction, initial = {}, user }) => {
  const [bannerIsOpen, setBannerIsOpen] = useState(false);
  const [musicIsOpen, setMusicIsOpen] = useState(false);
  const bannerPopupRef = useRef();
  const musicPopupRef = useRef();

  const openBannerPopup = (e) => {
    e.preventDefault();
    setBannerIsOpen(true);
    console.log("Banner opened");
  };

  const closeBannerPopup = (e) => {
    e.preventDefault();
    setBannerIsOpen(false);
    console.log("Banner closed");
  };

  const openMusicPopup = (e) => {
    e.preventDefault();
    setMusicIsOpen(true);
    console.log("Music opened");
  };

  const closeMusicPopup = (e) => {
    e.preventDefault();
    setMusicIsOpen(false);
    console.log("Music closed");
  };

  useEffect(() => {
    function handleClickOutside(e) {
      if (bannerIsOpen && bannerPopupRef.current && !bannerPopupRef.current.contains(e.target)) {
        setBannerIsOpen(false);
      }
      if (musicIsOpen && musicPopupRef.current && !musicPopupRef.current.contains(e.target)) {
        setMusicIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [bannerIsOpen, musicIsOpen]);
  

  return (
    <div className="story-form-container">
      <img className="bg" src="../../../img/blue-purple_gradient.png" alt="" />
      <Nav user={user} />

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
            required
            rows={1}
            defaultValue={initial.titre || ""}
          ></input>
        </div>
        <div className="form-input-container synopsis-input">
          <label htmlFor="synopsis">Synopsis</label>
          <textarea
            id="synopsis"
            name="synopsis"
            placeholder="Écrire..."
            required
            rows={3}
            defaultValue={initial.synopsis || ""}
          ></textarea>
        </div>

        <button onClick={openBannerPopup} className="btn-form btn-form-banner-img">
          Choisir une image de bannière
        </button>
        {bannerIsOpen && (
          <div className="popup-container">
            <div className="popup" ref={bannerPopupRef}>
              <button onClick={closeBannerPopup} className="popup-close-icon">
                <X />
              </button>
              <h2 className="">Parcourir la banque d'images</h2>
              <div className="banner-grid">
                <div className="img-wrapper">
                  <img className="" src="../../../img/banniere_1.jpg" alt="" />
                </div>
                <div className="img-wrapper">
                  <img className="" src="../../../img/banniere_2.jpg" alt="" />
                </div>
                <div className="img-wrapper">
                  <img className="" src="../../../img/banniere_3.jpg" alt="" />
                </div>
                <div className="img-wrapper">
                  <img className="" src="../../../img/banniere_4.jpg" alt="" />
                </div>
                <div className="img-wrapper">
                  <img className="" src="../../../img/banniere_5.jpg" alt="" />
                </div>
                <div className="img-wrapper">
                  <img className="" src="../../../img/banniere_6.jpg" alt="" />
                </div>
              </div>
              <hr className="popup-banner-hr" />
              <button className="btn-popup">Téléverser à partir de l'appareil</button>
            </div>
          </div>
        )}

        <button onClick={openMusicPopup} className="btn-form btn-form-add-music">
          <span className="material-symbols-outlined music-icon">music_note</span>
          Ajouter une musique
        </button>
        {musicIsOpen && (
          <div className="popup-container">
            <div className="popup" ref={musicPopupRef}>
              <button onClick={closeMusicPopup} className="popup-close-icon">
                <X />
              </button>
              <h2 className="">Parcourir la banque de musiques</h2>
              <div className="music-list">
                <button className="music-button">
                  <div className="icon">
                    <Music3 />
                  </div>
                  <div className="music-title">Ambiance d'horreur</div>{" "}
                  <div className="music-length">1:22</div>
                </button>
                <button className="music-button">
                  <div className="icon">
                    <Music3 />
                  </div>
                  <div className="music-title">Ambiance médiéval</div>{" "}
                  <div className="music-length">3:30</div>
                </button>
                <button className="music-button">
                  <div className="icon">
                    <Music3 />
                  </div>
                  <div className="music-title">Ambiance de magie</div>{" "}
                  <div className="music-length">1:41</div>
                </button>
              </div>
              <hr className="popup-banner-hr" />
              <button className="btn-popup">Téléverser à partir de l'appareil</button>
            </div>
          </div>
        )}

        <hr className="story-form-hr" />

        <button className="btn-form btn-form-continue" type="submit">
          Continuer
        </button>
      </form>
      <Footer />
    </div>
  );
};

export default StoryFormPage;
