import { signOut } from "../../actions/auth-actions";
import HistoireTemp from "../../_components/HistoireTemp";

const Utilisateurs = ({ displayName }) => {
    return (
        <div>
            <div className="btn_deco">
                <h1> {displayName} </h1>
                <form action={signOut}>
                    <button
                        type="submit"
                        className="text-purple-400 hover:text-purple-300 hover:underline"
                    >
                        Se déconnecter
                    </button>
                </form>
            </div>

            <div>
                <h2> Mes Histoires</h2>
                <HistoireTemp title="L'aventure magique" genre="Fantastique" synopsis="Une histoire captivante d'un jeune héros découvrant un monde enchanté." Img="https://example.com/image1.jpg" />
                <HistoireTemp title="Le mystère de la forêt" genre="Mystère" synopsis="Un groupe d'amis part à la découverte des secrets cachés dans une forêt mystérieuse." Img="https://example.com/image2.jpg" />
                <HistoireTemp title="Voyage dans le temps" genre="Science-fiction" synopsis="Un scientifique invente une machine à voyager dans le temps et explore différentes époques." Img="https://example.com/image3.jpg" />
            </div>
        </div>
    );
}
export default Utilisateurs;
