"use client";

import "../_components/Nav.css"
import "../_components/Footer.css"
import "../_components/MainPageClient.css"
import "../_components/LogInPage.css"

import Footer from "./Footer.jsx"
import Nav from "./Nav.jsx"

const UserAccountPage = () => {
    return (
        <div className="user-form-container">
            <img className="bg" src="../../../img/blue-purple_gradient.png" alt="" />
            <Nav />

            <h1 className="h1-user-form">USER ACCOUNT PAGE</h1>
            <form className="user-form" >
                <div className="form-input-container title-input">
                    <label htmlFor="title">Titre</label>
                    <textarea
                        id="title"
                        className="title"
                        placeholder="Écrire..."
                        required
                        rows={1}
                    ></textarea>
                </div>
                <div className="form-input-container synopsis-input">
                    <label htmlFor="synopsis">Synopsis</label>
                    <textarea
                        id="synopsis"
                        placeholder="Écrire..."
                        required
                    ></textarea>
                </div>

                <button className="btn-form btn-form-continue" >
                    Se connecter
                </button>

                <hr className="user-form-hr" />

                <button className="btn-form btn-form-banner-img" >
                   Se connecter avec Github
                </button>



            </form>
            <div>
            </div>
            {/* <Footer /> */}
        </div>
    )
}

export default UserAccountPage;