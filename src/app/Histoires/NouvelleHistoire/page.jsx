import HistoireForm from "@/app/_components/HistoireForm";
import { time } from "drizzle-orm/mysql-core";
const NouvelleHistoire = () => {
    return (
        <div>
            <h1>Créer une Nouvelle Histoire</h1>
            {/* Contenu pour créer une nouvelle histoire */}
            <HistoireForm titre={"Titre de l'histoire"} synopsis={"Synopsis"} bannierre={"Bannière"} formAction={"/some-action"}/>
        </div>
    );
};

export default NouvelleHistoire;