"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { signOut } from "../actions/auth-actions";
import LogoutIcon from "@mui/icons-material/Logout";

// TODO: Afficher dynamiquement la photo de profil (fallback sur account_icon si GitHub absent).
const Nav = ({ user: initialUser }) => {
  const [user, setUser] = useState(initialUser ?? null);

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
  const createStoryHref = isAuthenticated ? "/StoryForm" : "/auth/signIn";

  return (
    <nav className="header-nav">
      <a href="/">
        <img className="logo" src="../../../img/logo_inkveil.png" alt="" />
      </a>

      {!isAuthenticated && (
        <ul className="nav-list">
          <li>
            <Link href="/auth/signIn" className="btn-nav btn-compte">
              Se connecter
            </Link>
          </li>
          <li>
            <Link href="/auth/signUp" className="btn-nav btn-compte">
              S'inscrire
            </Link>
          </li>
          <li>
            <Link href={createStoryHref} className="btn-nav btn-creer">
              Créer une histoire
            </Link>
          </li>
        </ul>
      )}

      {isAuthenticated && (
        <ul className="nav-list">
          <li className="account-flex-container">
            <span className="btn-nav account-name">
              {user?.name || "Mon compte"}
            </span>
            <span className="btn-nav account-icon">
              <img src="../../../img/account_icon.svg" alt="" />
            </span>
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
            <Link href={createStoryHref} className="btn-nav btn-creer">
              Créer une histoire
            </Link>
          </li>
        </ul>
      )}
    </nav>
  );
};

export default Nav;
