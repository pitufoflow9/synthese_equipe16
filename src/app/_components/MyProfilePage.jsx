"use client";
import Link from "next/link";
import Footer from "./Footer.jsx"
import Nav from "./Nav.jsx"
import { BookOpen } from 'lucide-react';
import { useEffect } from "react";
import "swiper/css";

import "../_components/Nav.css"
import "../_components/Footer.css"
import "../_components/MainPageClient.css"
import "../_components/MyProfilePage.css"
import "../_components/Swiper.css"

import Swiper from 'swiper';
import EditIcon from '@mui/icons-material/Edit';

//TODO: Afficher dynamiquement le nom et la photo de profil de l'utilisateur.
//TODO: Intégrer la logique pour afficher les récits partagés de l'utilisateur.
//TODO: Intégrer la logique pour les boutons modifier et lire (rediriger vers la bonne page).
//TODO: Intégrer la logique pour afficher les brouillons de l'utilisateur seulement s'il en a.
const MyProfilePage = () => {
    useEffect(() => {
        const swiper = new Swiper('.swiper', {
            slidesPerView: 2.5,
            spaceBetween: 30,
            speed: 400,
            grabCursor: true,
            slidesOffsetAfter: 200
        });

    }, []);
    return (

        <div className="page-container">
            <img className="bg" src="../../../img/blue-purple_gradient.png" alt="" />
            <Nav />

            <div className="profile-container">
                <img className="profile-picture" src="../../../img/account_icon.svg" alt="" />
                <h2 className="profile-name">Émilie Paquin</h2>
            </div>

            {/* SECTION Récits Partagé */}
            <div className="swiper-container">
                <h2 className="swiper-h2">Récits partagés</h2>
                <div className="swiper">
                    <div className="swiper-wrapper">
                        {/*Slide 1 */}
                        <div className="swiper-slide swiper-first-slide">
                            <Link href="/storyoverview/id" className="swiper-link">
                                <div className="card">
                                    <div className="img-container">
                                        <img src="../../../img/placeholder.png" className="slide-img" alt="" />
                                        <div className="swiper-buttons-flex-container">
                                            <button className="edit-button">
                                                <EditIcon />
                                            </button>
                                            <button className="read-button">
                                                <p>Lire</p>
                                                <BookOpen className='read-icon' />
                                            </button>
                                        </div>
                                    </div>

                                    <h3>Les derniers jours de Noctis</h3>

                                    <p>
                                        Dans un manoir oublié par le temps, un vampire centenaire se retrouve confronté à un choix impossible : embrasser l'éternité dans les ténèbres ou chercher la rédemption avant l'aube finale. Chaque...
                                    </p>
                                    <p className='swiper-author'>Alexandre Gratton</p>
                                </div>
                            </Link>
                        </div>
                        {/* Slide 2 */}
                        <div className="swiper-slide">
                            <Link href="/storyoverview/id" className="swiper-link">
                                <div className="card">
                                    <div className="img-container">
                                        <img src="../../../img/placeholder.png" className="slide-img" alt="" />
                                        <div className="swiper-buttons-flex-container">
                                            <button className="edit-button">
                                                <EditIcon />
                                            </button>
                                            <button className="read-button">
                                                <p>Lire</p>
                                                <BookOpen className='read-icon' />
                                            </button>
                                        </div>
                                    </div>

                                    <h3>Entre les Pétales et les Épines</h3>

                                    <p>
                                        Au cœur d'une forêt enchantée, une jeune fée est chargée de restaurer l'équilibre entre les royaumes de lumière et d'ombre. Elle explore des clairières mystérieuses, noue des alliances avec les...
                                    </p>
                                    <p className='swiper-author'>Alexandre Gratton</p>
                                </div>
                            </Link>
                        </div>
                        {/* Slide 3 */}
                        <div className="swiper-slide">
                            <Link href="/storyoverview/id" className="swiper-link">
                                <div className="card">
                                    <div className="img-container">
                                        <img src="../../../img/placeholder.png" className="slide-img" alt="" />
                                        <div className="swiper-buttons-flex-container">
                                            <button className="edit-button">
                                                <EditIcon />
                                            </button>
                                            <button className="read-button">
                                                <p>Lire</p>
                                                <BookOpen className='read-icon' />
                                            </button>
                                        </div>
                                    </div>

                                    <h3>La Révolte du Paladin</h3>

                                    <p>
                                        Le royaume est au bord du gouffre et un noble chevalier doit choisir entre l'honneur et la rébellion. Alors que la corruption gangrène la cour royale, ses décisions détermineront s'il deviendra un héros...
                                    </p>
                                    <p className='swiper-author'>Alexandre Gratton</p>
                                </div>
                            </Link>
                        </div>
                        {/* Slide 4 */}
                        <div className="swiper-slide swiper-last-slide">
                            <Link href="/storyoverview/id" className="swiper-link">
                                <div className="card">
                                    <div className="img-container">
                                        <img src="../../../img/placeholder.png" className="slide-img" alt="" />
                                        <div className="swiper-buttons-flex-container">
                                            <button className="edit-button">
                                                <EditIcon />
                                            </button>
                                            <button className="read-button">
                                                <p>Lire</p>
                                                <BookOpen className='read-icon' />
                                            </button>
                                        </div>
                                    </div>

                                    <h3>Magie Blanche et Ombre</h3>

                                    <p>
                                        Au seuil de l'Académie des Arcanes, un apprenti mage découvre que chaque sortilège a un prix. Aux pouvoirs naissants, il devra naviguer entre traditions ancestrales et magie interdite. Ses choix...
                                    </p>
                                    <p className='swiper-author'>Alexandre Gratton</p>
                                </div>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>


            <hr />

            {/* SECTION Mes brouillons */}
            <div className="swiper-container">
                <h2 className="swiper-h2">Mes brouillons</h2>
                <div className="swiper">
                    <div className="swiper-wrapper">
                        {/*Slide 1 */}
                        <div className="swiper-slide swiper-first-slide">
                            <Link href="/storyoverview/id" className="swiper-link">
                                <div className="card">
                                    <div className="img-container">
                                        <img src="../../../img/placeholder.png" className="slide-img" alt="" />
                                        <div className="swiper-buttons-flex-container">
                                            <button className="edit-button">
                                                <EditIcon />
                                            </button>
                                            {/* <button className="read-button">
                                                <p>Lire</p>
                                                <BookOpen className='read-icon' />
                                            </button> */}
                                        </div>
                                    </div>

                                    <h3>Les derniers jours de Noctis</h3>

                                    <p>
                                        Dans un manoir oublié par le temps, un vampire centenaire se retrouve confronté à un choix impossible : embrasser l'éternité dans les ténèbres ou chercher la rédemption avant l'aube finale. Chaque...
                                    </p>
                                    <p className='swiper-author'>Alexandre Gratton</p>
                                </div>
                            </Link>
                        </div>
                        {/* Slide 2 */}
                        <div className="swiper-slide">
                            <Link href="/storyoverview/id" className="swiper-link">
                                <div className="card">
                                    <div className="img-container">
                                        <img src="../../../img/placeholder.png" className="slide-img" alt="" />
                                        <div className="swiper-buttons-flex-container">
                                            <button className="edit-button">
                                                <EditIcon />
                                            </button>
                                            {/* <button className="read-button">
                                                <p>Lire</p>
                                                <BookOpen className='read-icon' />
                                            </button> */}
                                        </div>
                                    </div>

                                    <h3>Entre les Pétales et les Épines</h3>

                                    <p>
                                        Au cœur d'une forêt enchantée, une jeune fée est chargée de restaurer l'équilibre entre les royaumes de lumière et d'ombre. Elle explore des clairières mystérieuses, noue des alliances avec les...
                                    </p>
                                    <p className='swiper-author'>Alexandre Gratton</p>
                                </div>
                            </Link>
                        </div>
                        {/* Slide 3 */}
                        <div className="swiper-slide">
                            <Link href="/storyoverview/id" className="swiper-link">
                                <div className="card">
                                    <div className="img-container">
                                        <img src="../../../img/placeholder.png" className="slide-img" alt="" />
                                        <div className="swiper-buttons-flex-container">
                                            <button className="edit-button">
                                                <EditIcon />
                                            </button>
                                            {/* <button className="read-button">
                                                <p>Lire</p>
                                                <BookOpen className='read-icon' />
                                            </button> */}
                                        </div>
                                    </div>

                                    <h3>La Révolte du Paladin</h3>

                                    <p>
                                        Le royaume est au bord du gouffre et un noble chevalier doit choisir entre l'honneur et la rébellion. Alors que la corruption gangrène la cour royale, ses décisions détermineront s'il deviendra un héros...
                                    </p>
                                    <p className='swiper-author'>Alexandre Gratton</p>
                                </div>
                            </Link>
                        </div>
                        {/* Slide 4 */}
                        <div className="swiper-slide swiper-last-slide">
                            <Link href="/storyoverview/id" className="swiper-link">
                                <div className="card">
                                    <div className="img-container">
                                        <img src="../../../img/placeholder.png" className="slide-img" alt="" />
                                        <div className="swiper-buttons-flex-container">
                                            <button className="edit-button">
                                                <EditIcon />
                                            </button>
                                            {/* <button className="read-button">
                                                <p>Lire</p>
                                                <BookOpen className='read-icon' />
                                            </button> */}
                                        </div>
                                    </div>

                                    <h3>Magie Blanche et Ombre</h3>

                                    <p>
                                        Au seuil de l'Académie des Arcanes, un apprenti mage découvre que chaque sortilège a un prix. Aux pouvoirs naissants, il devra naviguer entre traditions ancestrales et magie interdite. Ses choix...
                                    </p>
                                    <p className='swiper-author'>Alexandre Gratton</p>
                                </div>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>


            <Footer />
        </div >
    )
}

export default MyProfilePage;


