"use client";

const FormNode = () => {
    return (
        <div className="max-w-md mx-auto bg-gray-800 p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold text-white mb-4">Créer / Modifier un Noeud</h3>

            <form className="space-y-4">
                <div>
                    <label className="block text-gray-300 mb-1" htmlFor="title">Titre</label>
                    <input
                        id="title"
                        name="title"
                        type="text"
                        placeholder="Titre du noeud"
                        className="w-full p-2 rounded-md border border-gray-600 bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-amber-400"
                    />
                </div>

                <div>
                    <label className="block text-gray-300 mb-1" htmlFor="content">Contenu</label>
                    <textarea
                        id="content"
                        name="content"
                        rows={4}
                        placeholder="Texte du noeud..."
                        className="w-full p-2 rounded-md border border-gray-600 bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-amber-400"
                    />
                </div>

                <div className="flex items-center gap-2">
                    <input id="isEnd" name="isEnd" type="checkbox" className="h-4 w-4 text-amber-400 bg-gray-700 border-gray-600 rounded" />
                    <label htmlFor="isEnd" className="text-gray-300">Ceci est une fin ?</label>
                </div>

                <div className="pt-2">
                    <button
                        type="submit"
                        className="bg-amber-500 hover:bg-amber-400 text-white font-bold py-2 px-4 rounded w-full"
                    >
                        Enregistrer
                    </button>
                </div>
            </form>
        </div>
    );
}

export default FormNode;