"use client";

import "@/app/_components/Nav.css"
import "@/app/_components/Footer.css"
import "@/app/_components/MainPageClient.css"
import "@/app/_components/StoryFormPage.css"
import { useEffect, useState } from "react";
import { useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import SplitText from "gsap/SplitText";
import { useGSAP } from "@gsap/react";
import { useAudio } from "@/app/_context/AudioContext";
import { useSearchParams } from "next/navigation";

import Footer from "./Footer.jsx"
import Nav from "./Nav.jsx"
import { X } from 'lucide-react';
import { Ambiance3 } from 'lucide-react';

import StoryCustomisation from "@/app/_components/StoryCustomisation.jsx";
gsap.registerPlugin(SplitText, useGSAP);

const StoryFormPage = ({ formAction, user = null }) => {
    const [bannerIsOpen, setBannerIsOpen] = useState(false);
    const [ambianceIsOpen, setAmbianceIsOpen] = useState(false);
    const [effectIsOpen, setEffectIsOpen] = useState(false);
    const [selectedBanner, setSelectedBanner] = useState(null);
    const [selectedAmbiance, setSelectedAmbiance] = useState(null);
    const [selectedTextEffect, setSelectedTextEffect] = useState(null);
    const [userImages, setUserImages] = useState([]);
    const [isLoadingUserImages, setIsLoadingUserImages] = useState(false);
    const [userImagesError, setUserImagesError] = useState("");
    const searchParams = useSearchParams();
    const [title, setTitle] = useState(searchParams?.get("title") || "");
    const [synopsis, setSynopsis] = useState("");
    const bannerPopupRef = useRef();
    const ambiancePopupRef = useRef();
    const effectPopupRef = useRef();
    const preview1Ref = useRef(null);
    const preview2Ref = useRef(null);
    const preview3Ref = useRef(null);
    const { pause } = useAudio(false);

    const previewTlRef = useRef(null);
    const bannerImages = [
        "banniere_1.jpg",
        "banniere_2.jpg",
        "banniere_3.jpg",
        "banniere_4.jpg",
        "banniere_5.jpg",
        "banniere_6.jpg",
    ];

    const openBannerPopup = (e) => {
        e.preventDefault();
        setBannerIsOpen(true);
    };

    const closeBannerPopup = (e) => {
        e.preventDefault();
        setBannerIsOpen(false);
    };

    const openAmbiancePopup = (e) => {
        e.preventDefault();
        setAmbianceIsOpen(true);
    };

    const closeAmbiancePopup = (e) => {
        e.preventDefault();
        setAmbianceIsOpen(false);
    };

    const openEffectPopup = (e) => {
        e.preventDefault();
        setEffectIsOpen(true);
    };

    const closeEffectPopup = (e) => {
        e.preventDefault();
        setEffectIsOpen(false);
    };

    const previewButtonEnter = (textEffect, text) => {
        if (previewTlRef.current) {
            previewTlRef.current.kill();
        }
        previewTlRef.current = StoryCustomisation(
            text.current,
            null,
            null,
            textEffect,
            null,
            true
        );
    };

    const previewButtonLeave = (ref) => {
        if (previewTlRef.current) {
            previewTlRef.current.kill();
        }
        ref.current.innerHTML = ref.current.textContent;
    };

    const selectBanner = (banner) => {
        setSelectedBanner(banner);
        setBannerIsOpen(false);
    };

    const selectAmbiance = (value) => {
        setSelectedAmbiance(value);
        setAmbianceIsOpen(false);
    };

    const selectTextEffect = (value) => {
        setSelectedTextEffect(value);
        setEffectIsOpen(false);
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
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [bannerIsOpen, ambianceIsOpen, effectIsOpen]);

    //Pause la musique si l'utilisateur viens d'une page de visualisation d'histoire.
    useEffect(() => {
        pause();
    }, []);

    useEffect(() => {
        const incomingTitle = searchParams?.get("title") || "";
        if (incomingTitle) {
            setTitle(incomingTitle);
        }
    }, [searchParams]);

    useEffect(() => {
        const controller = new AbortController();
        const fetchUserImages = async () => {
            setIsLoadingUserImages(true);
            setUserImagesError("");
            try {
                const res = await fetch("/api/user-images", {
                    signal: controller.signal,
                });
                if (!res.ok) {
                    throw new Error("Impossible de recuperer vos images.");
                }
                const data = await res.json();
                setUserImages(data?.images ?? []);
            } catch (error) {
                if (error.name !== "AbortError") {
                    setUserImagesError(error.message);
                }
            } finally {
                setIsLoadingUserImages(false);
            }
        };
        fetchUserImages();
        return () => controller.abort();
    }, []);

    return (
        <div className="story-form-container">
            <img className="bg" src="../../../img/Background_2.jpg" alt="" />
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
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
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
                        value={synopsis}
                        onChange={(e) => setSynopsis(e.target.value)}
                        rows={3}
                    ></textarea>
                </div>

                {selectedBanner === null ? (
                    <button type="button" onClick={openBannerPopup} className="btn-form btn-add-img">
                        Choisir une image de bannière
                    </button>
                ) : (
                    <button type="button" onClick={openBannerPopup} className="btn-form btn-add-img chosen">
                        Changer l'image de bannière
                    </button>
                )}

                {bannerIsOpen &&
                    <div className="popup-container" >
                        <div className="storyform-popup popup-banner " ref={bannerPopupRef}>
                            <button type="button" onClick={closeBannerPopup} className="popup-close-icon">
                                <X />
                            </button>
                            <h2 className="">Parcourir la banque d'images</h2>
                            <div className={userImages.length !== 0 ? ("banners-container-1") : ("")}>
                                <div className="banners-container-2">
                                    {userImages.length > 0 && (
                                        <>
                                            <p className="user-images-label">Vos téléversements</p>
                                            <div className="banner-grid">
                                                {userImages.map((img) => (
                                                    <button
                                                        type="button"
                                                        key={img.id}
                                                        className={"img-wrapper " + (selectedBanner === img.url ? "active" : "")}
                                                        onClick={() => setSelectedBanner(img.url)}>
                                                        <img src={img.url} alt={img.description || "Image"} />
                                                    </button>
                                                ))}
                                            </div>
                                            <hr className="popup-banner-hr" />
                                        </>
                                    )}
                                    {isLoadingUserImages && <p>Chargement de vos images...</p>}
                                    {userImagesError && <p className="upload-error">{userImagesError}</p>}
                                    <p className="user-images-label">Galerie d’images</p>
                                    <div className="banner-grid" >
                                        {bannerImages.map((img) => (
                                            <button
                                                type="button"
                                                key={img}
                                                className={"img-wrapper " + (selectedBanner === img ? "active" : "")}
                                                onClick={() => setSelectedBanner((prev) => (prev === img ? null : img))}>
                                                <img src={`../../../img/${img}`} alt={img} />
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </div>
                            <hr className="popup-banner-hr" />
                            <Link href="../upload" ><button type="button" className="btn-popup">Téléverser à partir de l'appareil</button></Link>
                        </div>
                    </div>
                }

                <div className="form-btn-container">
                    {selectedAmbiance === null ? (
                        <button type="button" onClick={openAmbiancePopup} className="btn-form btn-form-add-ambiance">
                            Choisir une ambiance
                        </button>
                    ) : (
                        <button type="button" onClick={openAmbiancePopup} className="btn-form btn-form-add-ambiance chosen">
                            Changer l'ambiance
                        </button>
                    )}

                    {selectedTextEffect === null ? (
                        <button type="button" onClick={openEffectPopup} className="btn-form btn-form-add-effect">
                            Choisir un effet
                        </button>
                    ) : (
                        <button type="button" onClick={openEffectPopup} className="btn-form btn-form-add-effect chosen">
                            Changer l'effet
                        </button>
                    )}
                </div>

                {ambianceIsOpen &&
                    <div className="popup-container">
                        <div className="storyform-popup popup-ambiance" ref={ambiancePopupRef}>
                            <button type="button" onClick={closeAmbiancePopup} className="popup-close-icon">
                                <X />
                            </button>
                            <h2 className="">Parcourir nos choix d'ambiances</h2>
                            <div className="ambiance-list" >
                                <button type="button"
                                    className={"ambiance-button ambiance-horreur " + (selectedAmbiance === "1" ? "active-1" : "")}
                                    onClick={() => setSelectedAmbiance(selectedAmbiance === "1" ? null : "1")}
                                >
                                    <div className="ambiance-title">Ambiance d'horreur</div>
                                </button>
                                <button type="button"
                                    className={"ambiance-button ambiance-magique " + (selectedAmbiance === "2" ? "active-2" : "")}
                                    onClick={() => setSelectedAmbiance(selectedAmbiance === "2" ? null : "2")}
                                >
                                    <div className="ambiance-title">Ambiance magique</div>
                                </button>
                                <button type="button"
                                    className={"ambiance-button ambiance-medieval " + (selectedAmbiance === "3" ? "active-3" : "")}
                                    onClick={() => setSelectedAmbiance(selectedAmbiance === "3" ? null : "3")}
                                >
                                    <div className="ambiance-title">Ambiance médiéval</div>
                                </button>
                            </div>

                        </div>
                    </div>
                }
                {effectIsOpen &&
                    <div className="popup-container">
                        <div className="storyform-popup popup-effect" ref={effectPopupRef}>
                            <button type="button" onClick={closeEffectPopup} className="popup-close-icon">
                                <X />
                            </button>
                            <h2 className="">Parcourir nos d'effets</h2>
                            <div className="ambiance-list" >
                                {/* Theme 1 */}
                                <button type="button"
                                    className={"ambiance-button effect-preview effect-preview-1 " + (selectedTextEffect === "1" ? "active" : "")}
                                    onClick={() => setSelectedTextEffect(selectedTextEffect === "1" ? null : "1")}
                                    onMouseEnter={() => previewButtonEnter(1, preview1Ref)}
                                    onMouseLeave={() => previewButtonLeave(preview1Ref)}
                                >
                                    <div className="ambiance-title">Effet d'entrée par le bas  </div>
                                    <div className="effect-preview-placeholder" ref={preview1Ref}>
                                        Ceci est un aperçu
                                    </div>
                                </button>

                                {/* Theme 2 */}
                                <button type="button"
                                    className={"ambiance-button effect-preview effect-preview-2 " + (selectedTextEffect === "2" ? "active" : "")}
                                    onClick={() => setSelectedTextEffect(selectedTextEffect === "2" ? null : "2")}
                                    onMouseEnter={() => previewButtonEnter(2, preview2Ref)}
                                    onMouseLeave={() => previewButtonLeave(preview2Ref)}
                                >
                                    <div className="ambiance-title">Effet de flou</div>
                                    <div className="effect-preview-placeholder" ref={preview2Ref}>
                                        Ceci est un aperçu
                                    </div>
                                </button>

                                {/* Theme 3 */}
                                <button type="button"
                                    className={"ambiance-button effect-preview effect-preview-3 " + (selectedTextEffect === "3" ? "active" : "")}
                                    onClick={() => setSelectedTextEffect(selectedTextEffect === "3" ? null : "3")}
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
                <input type="hidden" name="banniere" value={selectedBanner || ""} />
                <input type="hidden" name="ambiance" value={selectedAmbiance || ""} />
                <input type="hidden" name="textEffect" value={selectedTextEffect || ""} />

                <button
                    type="submit"
                    className="btn-form btn-form-continue"
                    disabled={!title.trim() || !synopsis.trim() || !selectedBanner || !selectedAmbiance || !selectedTextEffect}
                >
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
