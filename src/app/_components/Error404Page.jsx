"use client";
import Link from "next/link";
import Footer from "./Footer.jsx"
import Nav from "./Nav.jsx"

import "@/app/_components/Nav.css"
import "@/app/_components/Footer.css"
import "@/app/_components/MainPageClient.css"
import "@/app/_components/Error404Page.css"

const Error404Page = () => {
    return (
        <div className="error404-page-container">
            <Nav />
            <img className="error404-bg" src="../../../img/blue-purple_gradient.png" alt="" />
            <div className="error404-flex-container">
                <h1 className="error404-h1">Nous avons perdu cette page!</h1>
                <div className="error404-flex-container-2">
                    <p>4</p>
                    <img src="../../../img/erreur_404.png" alt="" />
                    <p>4</p>
                </div>
                <Link href="/">
                    <button className="btn error404-btn-accueil">
                        Retourner à l'accueil
                    </button>
                </Link>
            </div>
        </div >
    )
}

export default Error404Page;


