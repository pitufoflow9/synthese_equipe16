"use client";

import "../_components/Nav.css"
import "../_components/Footer.css"
import "../_components/MainPageClient.css"
import "../_components/UploadPage.css"
import WestIcon from '@mui/icons-material/West';
import UploadFileIcon from '@mui/icons-material/UploadFile';

import Footer from "./Footer.jsx"
import Nav from "./Nav.jsx"
import Link from "next/link";

const UploadPage = () => {
    return (

        <div className="page-container">
            <img className="bg" src="../../../img/blue-purple_gradient.png" alt="" />

            <Nav />

            <h1 className="upload-h1">Téléversement de fichier</h1>
            <div className="upload-container-1">
                <Link href="/storyform">
                    <button className="btn btn-back">
                        <WestIcon />Retour
                    </button>
                </Link>
                <div className="upload-container-2">
                    <div className="upload-container-3">
                        <UploadFileIcon sx={{ fontSize: 80 }} />
                        <p>Déposez votre fichier ici ou <span>parcourez</span></p>
                    </div>
                    <button className="btn btn-browse">Parcourir</button>
                </div>
            </div>

            <Footer />
        </div>
    )
}

export default UploadPage;
