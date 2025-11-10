"use client";

const AuthForm = ({ titre, formAction, showName, ctaTitle, children }) => {
  return (
    <form
      action={formAction}
      className="bg-gray-900/80 backdrop-blur-lg p-8 rounded-2xl shadow-2xl border border-purple-500/30 w-full max-w-md space-y-6"
    >
      <h2 className="text-2xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">{titre}</h2>

      {showName && (
        <div>
          <label
            className="block text-sm font-medium text-gray-200"
            htmlFor="fld_name"
          >
            Nom complet
          </label>
          <input
            type="text"
            id="fld_name"
            name="name"
            required
            placeholder="Entrez votre nom"
            className="mt-1 w-full rounded-xl border border-purple-500/50 bg-gray-800/50 text-gray-100 placeholder-gray-500 px-3 py-2 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 focus:outline-none transition"
          />
        </div>
      )}

      <div>
        <label
          className="block text-sm font-medium text-gray-200"
          htmlFor="fld_email"
        >
          Adresse courriel
        </label>
        <input
          type="email"
          id="fld_email"
          name="email"
          autoComplete="email"
          required
          placeholder="exemple@email.com"
          className="mt-1 w-full rounded-xl border border-purple-500/50 bg-gray-800/50 text-gray-100 placeholder-gray-500 px-3 py-2 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 focus:outline-none transition"
        />
      </div>

      <div>
        <label
          className="block text-sm font-medium text-gray-200"
          htmlFor="fld_password"
        >
          Mot de passe
        </label>
        <input
          type="password"
          id="fld_password"
          placeholder="********"
          name="password"
          required
          className="mt-1 w-full rounded-xl border border-purple-500/50 bg-gray-800/50 text-gray-100 placeholder-gray-500 px-3 py-2 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 focus:outline-none transition"
        />
      </div>

      <button
        type="submit"
        className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold py-2.5 rounded-xl shadow-lg hover:from-purple-700 hover:to-pink-700 hover:shadow-purple-500/50 transition-all duration-300"
      >
        {ctaTitle}
      </button>

      {children}
    </form>
  );
};
export default AuthForm;
