"use client";
import Link from "next/link";
import Footer from "./Footer.jsx"
import Nav from "./Nav.jsx"

import "../_components/Nav.css"
import "../_components/Footer.css"
import "../_components/MainPageClient.css"
import "../_components/Erreur404Page.css"

const erreur404Page = () => {
    return (

        <div className="page-container">
            <Nav />
            <img className="bg" src="../../../img/blue-purple_gradient.png" alt="" />
            <div className="flex-container">
                <h1>Nous avons perdu cette page!</h1>
                <div className="flex-container-2">
                    <p>4</p>
                    <img className="bg" src="../../../img/erreur_404.png" alt="" />
                    <p>4</p>
                </div>
                <Link href="/">
                    <button className="btn btn-accueil">
                        Retourner à l'accueil
                    </button>
                </Link>
            </div>
            {/* <Footer /> */}
        </div >
    )
}

export default erreur404Page;


