
const HistoireTemp = ({title, synopsis, Img, genre}) => {
    return (
        <div className="histoires-temp-card bg-gray-800 p-4 rounded-lg shadow-md m-2">
            <p className="text-gray-400 italic mb-2">{genre}</p>
            {Img && <img src={Img} alt={title} className="w-full h-48 object-cover rounded-md mb-4" />}
            <h3 className="text-xl font-bold mb-2 text-white">{title}</h3>
            <p className="text-gray-300">{synopsis}</p>
        </div>
    );
}
export default HistoireTemp;