"use client";
import Link from "next/link";
import { signOut } from "../actions/auth-actions";

const Nav = () => {
    return (
        <nav className="header-nav">
            <a href="/"><img className="logo" src="../../../img/logo_inkveil.png" alt="" /></a>

            <ul className="nav-list">
                <li>
                    <Link href="/auth/signIn" className="btn btn-compte">
                        Se connecter
                    </Link>
                </li>
                <li>
                    <Link href="/auth/signUp" className="btn btn-compte">
                        S'inscrire
                    </Link>
                </li>
                <li>
                    <form action={signOut}>
                        <button
                            type="submit"
                            className="btn btn-compte"
                        >
                            Se déconnecter
                        </button>
                    </form>
                </li>
                <li>
                    {/* <Link href="/auth/signUp" className="btn btn-creer">
                        Créer une histoire
                    </Link> */}
                    <Link href="/StoryForm" className="btn btn-creer">
                        Créer une histoire
                    </Link>
                </li>
            </ul>

        </nav>
    )
}

export default Nav;


