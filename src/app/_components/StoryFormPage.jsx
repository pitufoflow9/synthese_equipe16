"use client";

import "../_components/Nav.css"
import "../_components/Footer.css"
import "../_components/MainPageClient.css"
import "../_components/StoryFormPage.css"
import { useEffect, useState } from "react";
import { useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import SplitText from "gsap/SplitText";
import { useGSAP } from "@gsap/react";

import Footer from "./Footer.jsx"
import Nav from "./Nav.jsx"
import { X } from 'lucide-react';
import { Ambiance3 } from 'lucide-react';
gsap.registerPlugin(SplitText, useGSAP);

//TODO: Intégrer la logique de la création de l'histoire (Titre, synopsis, image de bannière, ambiance).
//TODO (APRÈS L'ALPHA) : Pouvoir téléverser une image de bannière et/ou ambiance.
const previewAnimation = (theme, target) => {
    if (!target) return;

    target.innerHTML = target.textContent;

    // Theme 1 (preview)
    if (theme === 1) {
        const split = new SplitText(target, { type: "lines" });
        const lines = split.lines;

        gsap.set(lines, { opacity: 0, y: 50, color: "#ffffff" });

        const tl = gsap.timeline();
        tl.to(lines, {
            opacity: 1,
            y: 0,
            duration: 1.5,
            stagger: 0.5,
            ease: "power2.out",
        }).to(lines, {
            y: -15,
            duration: 3,
            yoyo: true,
            repeat: -1,
            ease: "power1.inOut",
            stagger: 0.2,
        });

        return tl;
    }

    // Theme 2 (preview)
    if (theme === 2) {
        const split = new SplitText(target, { type: "chars" });

        return gsap.from(split.chars, {
            opacity: 0,
            duration: 0.6,
            stagger: 0.01,
            filter: "blur(4px)",
        });
    }

    // Theme 3 (preview)
    if (theme === 3) {
        const split = new SplitText(target, { type: "chars" });

        gsap.set(split.chars, { opacity: 0, scale: 0 });

        return gsap.set(split.chars, {
            opacity: 1,
            scale: 1,
            y: () => gsap.utils.random(-3, 3),
            x: () => gsap.utils.random(-1, 1),
            rotation: () => gsap.utils.random(-1, 1),
            duration: 0.1,
            stagger: gsap.utils.random(0.01, 0.04),
        });
    }
};



const StoryFormPage = ({ formAction, user = null }) => {
    const [bannerIsOpen, setBannerIsOpen] = useState(false);
    const [ambianceIsOpen, setAmbianceIsOpen] = useState(false);
    const [effectIsOpen, setEffectIsOpen] = useState(false);
    const bannerPopupRef = useRef();
    const ambiancePopupRef = useRef();
    const effectPopupRef = useRef();
    const preview1Ref = useRef(null);
    const preview2Ref = useRef(null);
    const preview3Ref = useRef(null);

    const previewTlRef = useRef(null);
    const openBannerPopup = (e) => {
        e.preventDefault();
        setBannerIsOpen(true);
        console.log("Banner opened")
    };

    const closeBannerPopup = (e) => {
        e.preventDefault();
        setBannerIsOpen(false);
        console.log("Banner closed")
    };
    const openAmbiancePopup = (e) => {
        e.preventDefault();
        setAmbianceIsOpen(true);
        console.log("Ambiance opened")
    };

    const closeAmbiancePopup = (e) => {
        e.preventDefault();
        setAmbianceIsOpen(false);
        console.log("Ambiance closed")
    };

    const openEffectPopup = (e) => {
        e.preventDefault();
        setEffectIsOpen(true);
        console.log("Ambiance opened")
    };

    const closeEffectPopup = (e) => {
        e.preventDefault();
        setEffectIsOpen(false);
        console.log("Ambiance closed")
    };

    const previewButtonEnter = (theme, ref) => {
        if (previewTlRef.current) previewTlRef.current.kill();
        previewTlRef.current = previewAnimation(theme, ref.current);
    };

    const previewButtonLeave = (ref) => {
        if (previewTlRef.current) previewTlRef.current.kill();
        previewTlRef.current = null;
        if (ref.current) {
            ref.current.innerHTML = ref.current.textContent;
        }
    };


    useEffect(() => {
        function handleClickOutside(e) {
            if (bannerIsOpen && bannerPopupRef.current && !bannerPopupRef.current.contains(e.target)) {
                setBannerIsOpen(false);
            }
            if (ambianceIsOpen && ambiancePopupRef.current && !ambiancePopupRef.current.contains(e.target)) {
                setAmbianceIsOpen(false);
            }
            if (effectIsOpen && effectPopupRef.current && !effectPopupRef.current.contains(e.target)) {
                setEffectIsOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
    })

    return (
        <div className="story-form-container">
            <img className="bg" src="../../../img/blue-purple_gradient.png" alt="" />
            <Nav user={user} />

            <h1 className="h1-story-form">Nouvelle histoire</h1>
            <form className="story-form" action={formAction} >
                <div className="form-input-container title-input">
                    <label htmlFor="title">Titre</label>
                    <input
                        id="title"
                        name="titre"
                        className="title"
                        placeholder="Écrire..."
                        required
                        rows={1}
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
                    ></textarea>
                </div>

                <button type="button" onClick={openBannerPopup} className="btn-form btn-form-banner-img" >
                    Choisir une image de bannière
                </button>
                {bannerIsOpen &&
                    <div className="popup-container" >
                        <div className="popup" ref={bannerPopupRef}>
                            <button type="button" onClick={closeBannerPopup} className="popup-close-icon">
                                <X />
                            </button>
                            <h2 className="">Parcourir la banque d’images</h2>
                            <div className="banner-grid" >
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
                            <Link href="../upload" ><button type="button" className="btn-popup">Téléverser à partir de l'appareil</button></Link>
                        </div>
                    </div>
                }

                <div className="form-btn-container">
                    <button type="button" onClick={openAmbiancePopup} className="btn-form btn-form-add-ambiance" >
                        Choisir une ambiance
                    </button>
                    <button type="button" onClick={openEffectPopup} className="btn-form btn-form-add-effect" >
                        Choisir une effet
                    </button>
                </div>
                {ambianceIsOpen &&
                    <div className="popup-container">
                        <div className="popup" ref={ambiancePopupRef}>
                            <button type="button" onClick={closeAmbiancePopup} className="popup-close-icon">
                                <X />
                            </button>
                            <h2 className="">Parcourir nos choix d'ambiances</h2>
                            <div className="ambiance-list" >
                                <button type="button" className="ambiance-button ambiance-horreur" >
                                    <div className="ambiance-title">Ambiance d'horreur</div>
                                </button>
                                <button type="button" className="ambiance-button ambiance-medieval">
                                    <div className="ambiance-title">Ambiance médiéval</div>
                                </button>
                                <button type="button" className="ambiance-button ambiance-magique" >
                                    <div className="ambiance-title">Ambiance magique</div>
                                </button>
                            </div>
                            <hr className="popup-banner-hr" />
                            <Link href="../upload" ><button type="button" className="btn-popup">Téléverser à partir de l'appareil</button></Link>
                        </div>
                    </div>
                }
                {effectIsOpen &&
                    <div className="popup-container">
                        <div className="popup popup-effect" ref={effectPopupRef}>
                            <button type="button" onClick={closeEffectPopup} className="popup-close-icon">
                                <X />
                            </button>
                            <h2 className="">Parcourir nos d'effets</h2>
                            <div className="ambiance-list" >
                                {/* Theme 1 */}
                                <button type="button" className="ambiance-button effect-preview effect-preview-1"
                                    onMouseEnter={() => previewButtonEnter(1, preview1Ref)}
                                    onMouseLeave={() => previewButtonLeave(preview1Ref)}
                                >
                                    <div className="ambiance-title">Effet d'entrée par le bas  </div>
                                    <div className="effect-preview-placeholder" ref={preview1Ref}>
                                        Ceci est un aperçu
                                    </div>
                                </button>

                                {/* Theme 2 */}
                                <button type="button" className="ambiance-button effect-preview effect-preview-2"
                                    onMouseEnter={() => previewButtonEnter(2, preview2Ref)}
                                    onMouseLeave={() => previewButtonLeave(preview2Ref)}
                                >
                                    <div className="ambiance-title">Effet de flou</div>
                                    <div className="effect-preview-placeholder" ref={preview2Ref}>
                                        Ceci est un aperçu
                                    </div>
                                </button>

                                {/* Theme 3 */}
                                <button type="button" className="ambiance-button effect-preview effect-preview-3"
                                    onMouseEnter={() => previewButtonEnter(3, preview3Ref)}
                                    onMouseLeave={() => previewButtonLeave(preview3Ref)}
                                >
                                    <div className="ambiance-title">Effet de machine à écrire</div>
                                    <div className="effect-preview-placeholder" ref={preview3Ref}>
                                        Ceci est un aperçu
                                    </div>
                                </button>
                            </div>
                        </div>
                    </div>
                }

                <hr className="story-form-hr" />

                <button type="submit" className="btn-form btn-form-continue" >
                    Continuer
                </button>


            </form >
            <div>
            </div>
            <Footer />
        </div >
    )
}

export default StoryFormPage;




