"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { signOut } from "../actions/auth-actions";
import LogoutIcon from "@mui/icons-material/Logout";

import gsap from "gsap";
import { CustomEase } from "gsap/all";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { usePathname } from 'next/navigation'
import { useAudio } from "../_context/AudioContext.jsx";

gsap.registerPlugin(useGSAP, ScrollTrigger, CustomEase);

const Nav = ({ user: initialUser }) => {
  const [user, setUser] = useState(initialUser ?? null);
  const pathname = usePathname();
  const isVisualizerPage = pathname?.includes("/storyvisualizer");
  const { changeSource, play, isReady, changeVolume, pause } = useAudio(false);

  useEffect(() => {
    if (initialUser !== undefined) return;
    let active = true;
    const fetchSession = async () => {
      try {
        const res = await fetch("/api/session");
        if (!res.ok) throw new Error("Session fetch failed");
        const data = await res.json();
        if (!active) return;
        setUser(data?.user ?? null);
      } catch (error) {
        console.error("[nav] Impossible de récupérer la session", error);
        if (active) setUser(null);
      }

    };
    fetchSession();
    return () => {
      active = false;
    };
  }, [initialUser]);

  const isAuthenticated = !!user;
  const createStoryHref = isAuthenticated ? "/storyform" : "/auth/signin";

  useGSAP(() => {
    const nav = document.querySelector('.header-nav');
    const showAnim = gsap.from(nav, {
      yPercent: -120,
      paused: true,
      duration: 0
    }).progress(1);

    ScrollTrigger.create({
      trigger: ".header-nav",
      start: "top top",
      end: 99999,
      onUpdate: (self) => {
        self.direction === -1 ? showAnim.play() : showAnim.reverse()
      }
    });

    ScrollTrigger.create({
      trigger: ".header-nav",
      start: "top top",
      end: 99999,
      onUpdate: () => {
        if (!pathname?.includes("/storyvisualizer"))
          nav.classList.toggle('is-not-at-top', window.scrollY > 20);
      },
    });
  }, { dependencies: [pathname] });


  return (
    <nav className={pathname === "/" ? ("header-nav no-opacity") : ("header-nav")}>
      {!isAuthenticated && (
        <ul className="nav-list">

          <li onClick={() => pause()}><a href="/"><img className="logo main-logo" src={isVisualizerPage ? "../../../img/logo_inkveil_white.png" : "../../../img/logo_inkveil.png"} alt="" /></a></li>
          <div className="account-actions-container">
            <li onClick={() => pause()}>
              <Link href="/auth/signin" className={isVisualizerPage ? "btn-nav btn-compte white" : "btn-nav btn-compte"}>
                Se connecter
              </Link>
            </li>
            <li onClick={() => pause()}>
              <Link href="/auth/signup" className={isVisualizerPage ? "btn-nav btn-compte white" : "btn-nav btn-compte"}>
                S'inscrire
              </Link>
            </li>
            <li onClick={() => pause()}>
              <Link href="/#stories" className={isVisualizerPage ? "btn-nav btn-compte white" : "btn-nav btn-compte"}>
                Lire
              </Link>
            </li>
          </div>
          <li onClick={() => pause()}>
            <Link href="/storyform" className={isVisualizerPage ? "btn-nav btn-create white" : "btn-nav btn-create"}>
              Créer une histoire
            </Link>
          </li>
        </ul>

      )}

      {isAuthenticated && (
        <ul className={isVisualizerPage ? "nav-list nav-list-connected white" : "nav-list nav-list-connected"}>
          <li onClick={() => pause()}><a href="/"><img className="logo loader main-logo" src={isVisualizerPage ? "../../../img/logo_inkveil_white.png" : "../../../img/logo_inkveil.png"} alt="" /></a></li>
          <li onClick={() => pause()}>
            <Link href="/profiles/myprofile" className="account-flex-container">
              <span className="btn-nav account-name">
                {user?.name || "Mon compte"}
              </span>
              <span className="btn-nav account-icon">
                <img className="logo" src={isVisualizerPage ? "../../../img/account_icon_white.png" : "../../../img/account_icon_gray.png"} alt="" />
              </span>
            </Link>
          </li>
          <li onClick={() => pause()}>
            <form action={signOut}>
              <button
                type="submit"
                className="btn-nav btn-compte"
                title="Se déconnecter"

              >
                <LogoutIcon sx={{ fontSize: 30 }} />
              </button>
            </form>
          </li>
          <li onClick={() => pause()}>
            <Link href="/storyform" className={isVisualizerPage ? "btn-nav btn-create white" : "btn-nav btn-create"}>
              Créer une histoire
            </Link>
          </li>
        </ul>

      )}
    </nav >
  );
};

export default Nav;
