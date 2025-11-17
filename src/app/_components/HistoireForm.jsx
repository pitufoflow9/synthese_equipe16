'use client';

const HistoireForm = ({titre, synopsis, bannierre, formAction}) => {
    return (
        <form
        action={formAction}
        className="histoire-form bg-gray-800 p-6 rounded-lg shadow-md max-w-lg mx-auto"
        >
        <h2 className="text-2xl font-bold mb-4 text-white">Créer une Nouvelle Histoire</h2>
        <div className="mb-4">
            <label className="block text-gray-300 mb-2" htmlFor="titre">{titre} :</label>
            <input
            type="text"
            id="titre"
            name="titre"
            required
            placeholder="Entrer votre titre"
            className="w-full p-2 rounded-md border border-gray-600 bg-gray-700 text-white"
            />
        </div>
        <div className="mb-4">
            <label className="block text-gray-300 mb-2" htmlFor="synopsis">{synopsis} :</label>
            <input
            type="text"
            id="synopsis"
            name="synopsis"
            required
            placeholder="Entrer votre synopsis"
            className="w-full p-2 rounded-md border border-gray-600 bg-gray-700 text-white"
            />
        </div>
        <div className="theme mb-4">
            <label className="block text-gray-300 mb-2">{bannierre} :</label>

            <div
                className="max-h-40 overflow-y-auto rounded-md border border-gray-600 bg-gray-700 p-2"
                role="listbox"
                aria-label="Sélection de thème"
            >
                {/* zone vide pour les thèmes — possibilité d'ajouter/afficher des options plus tard */}
            </div>
        </div>
        <div className="mb-4">
            <button
            type="button"
            className="bg-purple-600 hover:bg-purple-500 text-white font-bold py-2 px-4 rounded"
            >
            Ajouter une musique
            </button>
        </div>

        <button
            type="submit"
            className="bg-amber-500 hover:bg-amber-400 text-white font-bold py-2 px-4 rounded"
        >
            Continuer
        </button>
            
        </form>
    );
}

export default HistoireForm;