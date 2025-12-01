"use client";
import Link from "next/link";
import Footer from "./Footer.jsx";
import Nav from "./Nav.jsx";
import { BookOpen } from "lucide-react";
import { useEffect } from "react";

import "../_components/Nav.css";
import "../_components/Footer.css";
import "../_components/MainPageClient.css";
import "../_components/AccountPage.css";
import "../_components/Swiper.css";

import Swiper from "swiper";
import "swiper/css";
import { authClient } from "@/lib/auth-client";

//TODO: Int�grer la logique pour afficher les r�cits partag�s de l'utilisateur.
//TODO: Int�grer la logique pour le bouton lire (rediriger vers la bonne page).

const AccountPage = () => {
    const { data: session } = authClient.useSession();
    const displayName = session?.user?.name || "Invite";
    const profileImage =
        session?.user?.image || "../../../img/account_icon.svg";

    useEffect(() => {
        const swiper = new Swiper(".swiper", {
            slidesPerView: 2.5,
            spaceBetween: 30,
            speed: 400,
            grabCursor: true,
            slidesOffsetAfter: 200,
        });
    }, []);
    return (
        <div className="page-container">
            <img
                className="bg"
                src="../../../img/blue-purple_gradient.png"
                alt=""
            />
            <Nav />

            <div className="profile-container">
                <img
                    className="profile-picture"
                    src={profileImage}
                    alt={`Profil de ${displayName}`}
                />

                <h2 className="profile-name">{displayName}</h2>
            </div>

            <div className="swiper-container">
                <h2 className="swiper-h2">R�cits partag�s</h2>
                <div className="swiper">
                    <div className="swiper-wrapper">
                        {/*Slide 1 */}
                        <div className="swiper-slide swiper-first-slide">
                            <div className="card">
                                <div className="img-container">
                                    <img
                                        src="../../../img/placeholder.png"
                                        className="slide-img"
                                        alt=""
                                    />
                                    <button className="read-button">
                                        {/* <p>Lire</p> */}
                                        <BookOpen className="read-icon" />
                                    </button>
                                </div>
                                <div className="tags">
                                    <span>Vampire</span>
                                    <span>Amour</span>
                                </div>
                                <h3>Les derniers jours de Noctis</h3>
                                <p>
                                    Dans un manoir oubli� par le temps, un
                                    vampire centenaire se retrouve confront� �
                                    un choix impossible : embrasser l'�ternit�
                                    dans les t�n�bres ou chercher la r�demption
                                    avant l'aube finale. Chaque...
                                </p>
                            </div>
                        </div>
                        {/* Slide 2 */}
                        <div className="swiper-slide">
                            <div className="card">
                                <div className="img-container">
                                    <img
                                        src="../../../img/placeholder.png"
                                        className="slide-img"
                                        alt=""
                                    />
                                    <button className="read-button">
                                        {/* <p>Lire</p> */}
                                        <BookOpen className="read-icon" />
                                    </button>
                                </div>
                                <div className="tags">
                                    <span>F�e</span>
                                    <span>Action</span>
                                </div>
                                <h3>Entre les P�tales et les �pines</h3>
                                <p>
                                    Au cour d'une for�t enchant�e, une jeune f�e
                                    est charg�e de restaurer l'�quilibre entre
                                    les royaumes de lumi�re et d'ombre. Elle
                                    explore des clairi�res myst�rieuses, noue
                                    des alliances avec les...
                                </p>
                            </div>
                        </div>
                        {/* Slide 3 */}
                        <div className="swiper-slide">
                            <div className="card">
                                <div className="img-container">
                                    <img
                                        src="../../../img/placeholder.png"
                                        className="slide-img"
                                        alt=""
                                    />
                                    <button className="read-button">
                                        {/* <p>Lire</p> */}
                                        <BookOpen className="read-icon" />
                                    </button>
                                </div>
                                <div className="tags">
                                    <span>Guerrier</span>
                                    <span>Amour</span>
                                </div>
                                <h3>La R�volte du Paladin</h3>
                                <p>
                                    Le royaume est au bord du gouffre et un
                                    noble chevalier doit choisir entre l'honneur
                                    et la r�bellion. Alors que la corruption
                                    gangr�ne la cour royale, ses d�cisions
                                    d�termineront s'il deviendra un h�ros...
                                </p>
                            </div>
                        </div>
                        {/* Slide 4 */}
                        <div className="swiper-slide swiper-last-slide">
                            <div className="card">
                                <div className="img-container">
                                    <img
                                        src="../../../img/placeholder.png"
                                        className="slide-img"
                                        alt=""
                                    />
                                    <button className="read-button">
                                        {/* <p>Lire</p> */}
                                        <BookOpen className="read-icon" />
                                    </button>
                                </div>
                                <div className="tags">
                                    <span>Action</span>
                                    <span>Magie</span>
                                </div>
                                <h3>Magie Blanche et Ombre</h3>
                                <p>
                                    Au seuil de l'Acad�mie des Arcanes, un
                                    apprenti mage d�couvre que chaque sortil�ge
                                    a un prix. Aux pouvoirs naissants, il devra
                                    naviguer entre traditions ancestrales et
                                    magie interdite. Ses choix...
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer></Footer>
        </div>
    );
};

export default AccountPage;

