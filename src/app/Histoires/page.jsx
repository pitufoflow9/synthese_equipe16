const { default: HistoireTemp } = require("../_components/HistoireTemp")

const Histoires = (displayName) => {
    return [
        <HistoireTemp key={1} title="L'aventure magique" genre="Fantastique" synopsis="Une histoire captivante d'un jeune héros découvrant un monde enchanté." Img="https://example.com/image1.jpg" />,
        ];
}
export default Histoires