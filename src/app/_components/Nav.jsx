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
gsap.registerPlugin(useGSAP, ScrollTrigger, CustomEase);

// TODO: Afficher dynamiquement la photo de profil (fallback sur account_icon si GitHub absent).
const Nav = ({ user: initialUser }) => {
  const [user, setUser] = useState(initialUser ?? null);
  const pathname = usePathname();
  var isVisualizerPage = pathname.includes("StoryVisualizer");

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
        nav.classList.toggle('is-not-at-top', window.scrollY > 20);
      },
    });
  }, { dependencies: [pathname] });


  return (
    <nav className="header-nav">
      {!isAuthenticated && (
        <ul className="nav-list">
          <li><a href="/"><img className="logo" src={isVisualizerPage ? "../../../img/logo_inkveil_white.png" : "../../../img/logo_inkveil.png"} alt="" /></a></li>
          <div className="account-actions-container">
            <li>
              <Link href="/auth/signin" className={isVisualizerPage ? "btn-nav btn-compte white" : "btn-nav btn-compte"}>
                Se connecter
              </Link>
            </li>
            <li>
              <Link href="/auth/signup" className={isVisualizerPage ? "btn-nav btn-compte white" : "btn-nav btn-compte"}>
                S'inscrire
              </Link>
            </li>
            <li>
              <Link href="/#stories" className={isVisualizerPage ? "btn-nav btn-compte white" : "btn-nav btn-compte"}>
                Lire
              </Link>
            </li>
          </div>
          <li>
            <Link href="/storyform" className={isVisualizerPage ? "btn-nav btn-create white" : "btn-nav btn-create"}>
              Créer une histoire
            </Link>
          </li>
        </ul>

      )}

      {isAuthenticated && (

        <ul className="nav-list nav-list-connected">
          <li><a href="/"><img className="logo" src={isVisualizerPage ? "../../../img/logo_inkveil_white.png" : "../../../img/logo_inkveil.png"} alt="" /></a></li>
          <li>
            <Link href="/profiles/myprofile" className="account-flex-container">
              <span className="btn-nav account-name">
                {user?.name || "Mon compte"}
              </span>
              <span className="btn-nav account-icon">
                <img src="../../../img/account_icon.svg" alt="" />
              </span>
            </Link>
          </li>
          <li>
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
          <li>
            <Link href={createStoryHref} className="btn-nav btn-create">
              Créer une histoire
            </Link>
          </li>
        </ul>

      )}
    </nav >
  );
};

export default Nav;
