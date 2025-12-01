
"use client";
import Link from "next/link";
import Footer from "./Footer.jsx"
import Nav from "./Nav.jsx"
import { BookOpen } from 'lucide-react';

import "../_components/Nav.css"
import "../_components/Footer.css"
import "../_components/MainPageClient.css"
import "../_components/StoryOverviewPage.css"

//TODO: Récupérer les données des histoires les afficher.
//TODO: Permettre de cliquer sur le bouton lire pour aller à sa page de visualisation.
//TODO: Permettre de cliquer sur l'utilisateur pour aller au profil de celui-ci.

const StoryOverviewPage = () => {
    return (
        <div className="overview-page-container">
            <img className="bg" src="../../../img/blue-purple_gradient.png" alt="" />
            <Nav />
            <h1 className="overview-title"></h1>
            <div className="story-card-container">
                <div className="story-card">

                    <div className="overview-flex-1">
                        <div className="img-container">
                            <img src="../../../img/placeholder.png" className="overview-img" alt="" />
                        </div>
                        <div className="overview-tags">
                            <div className="tag action-tag">Action</div>
                            <div className="tag magic-tag">Magie</div>
                        </div>
                        <Link href="/Profiles/User/slug" className="">
                            <p className="author">Alexandre Gratton</p>
                        </Link>
                    </div>
                    <div className="overview-flex-2">
                        <h3>Magie Blanche et Ombre</h3>
                        <p className="overview-synopsis">
                            Au seuil de l'Académie des Arcanes, un apprenti mage découvre que chaque sortilège a un prix. Aux pouvoirs naissants, il devra naviguer entre traditions ancestrales et magie interdite. Ses choix détermineront non seulement son destin, mais aussi l'équilibre fragile entre lumière et ténèbres. Dans l'ombre des bibliothèques oubliées, des secrets millénaires l'attendent, tandis que des forces obscures convoitent son potentiel inexploité. Entre loyauté envers ses maîtres et la tentation d'un pouvoir absolu, il découvrira que certaines vérités sont plus dangereuses que n'importe quel sortilège.
                        </p>
                        <Link href="/StoryVisualizer/id" className="">
                            <button className="read-button">
                                <p>Lire</p>
                                <BookOpen className='read-icon' />
                            </button>
                        </Link>
                    </div>
                </div >
            </div>
        </div >
    )
}

export default StoryOverviewPage;

