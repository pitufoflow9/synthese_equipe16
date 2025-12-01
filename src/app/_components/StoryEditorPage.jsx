
"use client";
import Link from "next/link";
import Footer from "./Footer.jsx"
import Nav from "./Nav.jsx"
import CustomSwitch from "./CustomSwitch.jsx"
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import AddIcon from '@mui/icons-material/Add';

import "../_components/Nav.css"
import "../_components/Footer.css"
import "../_components/MainPageClient.css"
import "../_components/StoryEditorPage.css"

// TODO: Afficher le nom de l'histoire que l'utilisateur est en train de modifier.
// TODO: La logique des choixs (ajout, suppression, modification de nodes, toggle fin de l'histoire).
// TODO: Pouvoir publier l'histoire (bouton publier).

const storyModificationPage = () => {
  return (
    <div className="page-container">
      <Nav />
      <div className="nav-bg"></div>
      <div className="flex-container-toolbar">
        <div className="tool-bar">
          <label htmlFor="title">Nom du choix</label>
          <input
            className="choice-name"
            placeholder="Écrire..."
            // required
            rows={1}
          ></input>
          <label htmlFor="title">Texte</label>
          <textarea
            placeholder="Écrire..."
            // required
            rows={20}
          ></textarea>
          <div className="switch-container">
            <p>Fin</p>
            <CustomSwitch />
          </div>
          <button className="btn btn-editor-appliquer">Appliquer</button>
          <div className="bg-grid"></div>
        </div>
        <div className="stroy-title-container">
          <div className="story-name">Nom de l'histoire</div>
        </div>
      </div>
      <div className="flex-container-icons">
        <button className="icon delete-icon">
          <DeleteOutlineIcon sx={{
            color: '#ff0000ff',
            fontSize: 30,
          }} />
        </button>
        <button className="icon add-icon">
          <AddIcon sx={{
            color: '#333333',
            fontSize: 30,
          }} />

        </button>
      </div>
      <button className="publish-icon">
        Publier
      </button>
    </div >
  )
}

export default storyModificationPage;

