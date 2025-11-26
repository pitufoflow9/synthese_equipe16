

"use client";
import Link from "next/link";
import Footer from "./Footer.jsx"
import Nav from "./Nav.jsx"
// import Switch from '@mui/material/Switch ';
import CustomSwitch from "./CustomSwitch.jsx"
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import AddIcon from '@mui/icons-material/Add';

import "../_components/Nav.css"
import "../_components/Footer.css"
import "../_components/MainPageClient.css"
import "../_components/StoryEditorPage.css"

const storyModificationPage = () => {
  return (
    <div className="page-container">
      <Nav />
      <div className="nav-bg"></div>
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
        <div className="flex-container-icons">
          <button className="delete-icon">
            <DeleteOutlineIcon sx={{ color: '#ff3c3cff' }} />
          </button>
          <button className="add-icon">
            <AddIcon  sx={{ color: 'white' }}/>
          </button>
        </div>

    </div >
  )
}

export default storyModificationPage;

