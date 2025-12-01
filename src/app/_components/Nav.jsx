"use client";
import Link from "next/link";
import { signOut } from "../actions/auth-actions";
import LogoutIcon from '@mui/icons-material/Logout';

// TODO: Si la page est le visualiseur d'histoire, utiliser le logo blanc (peut etre fait après l'alpha je crois) */ }
// TODO: Afficher dynamiquement le nom d l'utilisateur et sa photo de profile (utiliser l'image account_icon s'il n'y a  pas de photo de profil venant de github (car le seul moyen que l'utilisateur ait une photo de profil c'est qu'il s'est connecté avec GitHub; c'est ce que le professeur m'a dit))

const Nav = () => {
    return (
        <nav className="header-nav">
            {/* /////////////////////////////VERSION DÉCONNECTÉ////////////////////////////////// */}
            <a href="/"><img className="logo" src="../../../img/logo_inkveil.png" alt="" /></a>
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
                    <Link href="/auth/signUp" className="btn-nav btn-creer">
                        Créer une histoire
                    </Link>
                </li>
            </ul>
            {/* /////////////////////////////VERSION CONNECTÉ////////////////////////////////// */}
            {/* 
            <a href="/"><img className="logo" src="../../../img/logo_inkveil.png" alt="" /></a>

            <ul className="nav-list">
                <li className="account-flex-container">
                    <Link href="/profiles/MyProfile" className="btn-nav account-name">
                        Emilie Paquin
                    </Link>

                    <Link href="/profiles/MyProfile" className="btn-nav account-icon">
                        <img src="../../../img/account_icon.svg" alt="" />
                    </Link>
                </li>
                <li>
                    <Link href="/" className="btn-nav btn-compte">
                        <LogoutIcon
                            sx={{ fontSize: 30 }}
                        />
                    </Link>
                </li>
                <li>
                    <Link href="/StoryForm" className="btn-nav btn-creer">
                        Créer une histoire
                    </Link>
                </li>
            </ul>*/}
        </nav >
    )
}

export default Nav;


