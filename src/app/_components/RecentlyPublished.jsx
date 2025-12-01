"use client";
import { BookOpen } from 'lucide-react';
import Link from "next/link";


//TODO: Poouvoir accéder à la page "overview" en cliquant sur une histoire. (Question prof: Ajouter un link autour de chaque slide fait bugger le css)
const RecemmentPubliees = () => {
    return (
        <section>
            <h2 className='section-title'>Récemment publiées</h2>
            <div className="swiper-container">
                <div className="swiper">
                    <div className="swiper-wrapper">
                        {/*Slide 1 */}
                        <div className="swiper-slide swiper-first-slide">
                            <Link href="/StoryOverview/id" className="swiper-link">
                                <div className="card">
                                    <div className="img-container">
                                        <img src="../../../img/placeholder.png" className="slide-img" alt="" />
                                        <button className="read-button">
                                            <p>Lire</p>
                                            <BookOpen className='read-icon' />
                                        </button>
                                    </div>
                                    <div className="tags">
                                        <span>Vampire</span>
                                        <span>Amour</span>
                                    </div>
                                    <h3>Les derniers jours de Noctis</h3>
                                    <p>
                                        Dans un manoir oublié par le temps, un vampire centenaire se retrouve confronté à un choix impossible : embrasser l'éternité dans les ténèbres ou chercher la rédemption avant l'aube finale. Chaque...
                                    </p>
                                </div>
                            </Link>
                        </div>
                        {/* Slide 2 */}
                        <div className="swiper-slide">
                            <Link href="/StoryOverview/id" className="swiper-link">
                                <div className="card">
                                    <div className="img-container">
                                        <img src="../../../img/placeholder.png" className="slide-img" alt="" />
                                        <button className="read-button">
                                            <p>Lire</p>
                                            <BookOpen className='read-icon' />
                                        </button>
                                    </div>
                                    <div className="tags">
                                        <span>Fée</span>
                                        <span>Action</span>
                                    </div>
                                    <h3>Entre les Pétales et les Épines</h3>
                                    <p>
                                        Au cœur d'une forêt enchantée, une jeune fée est chargée de restaurer l'équilibre entre les royaumes de lumière et d'ombre. Elle explore des clairières mystérieuses, noue des alliances avec les...
                                    </p>
                                </div>
                            </Link>
                        </div>
                        {/* Slide 3 */}
                        <div className="swiper-slide">
                            <Link href="/StoryOverview/id" className="swiper-link">
                                <div className="card">
                                    <div className="img-container">
                                        <img src="../../../img/placeholder.png" className="slide-img" alt="" />
                                        <button className="read-button">
                                            <p>Lire</p>
                                            <BookOpen className='read-icon' />
                                        </button>
                                    </div>
                                    <div className="tags">
                                        <span>Guerrier</span>
                                        <span>Amour</span>
                                    </div>
                                    <h3>La Révolte du Paladin</h3>
                                    <p>
                                        Le royaume est au bord du gouffre et un noble chevalier doit choisir entre l'honneur et la rébellion. Alors que la corruption gangrène la cour royale, ses décisions détermineront s'il deviendra un héros...
                                    </p>
                                </div>
                            </Link>
                        </div>
                        {/* Slide 4 */}
                        <div className="swiper-slide swiper-last-slide">
                            <Link href="/StoryOverview/id" className="swiper-link">
                                <div className="card">
                                    <div className="img-container">
                                        <img src="../../../img/placeholder.png" className="slide-img" alt="" />
                                        <button className="read-button">
                                            <p>Lire</p>
                                            <BookOpen className='read-icon' />
                                        </button>
                                    </div>
                                    <div className="tags">
                                        <span>Action</span>
                                        <span>Magie</span>
                                    </div>
                                    <h3>Magie Blanche et Ombre</h3>
                                    <p>
                                        Au seuil de l'Académie des Arcanes, un apprenti mage découvre que chaque sortilège a un prix. Aux pouvoirs naissants, il devra naviguer entre traditions ancestrales et magie interdite. Ses choix...
                                    </p>
                                </div>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </section >

    )
}

export default RecemmentPubliees;