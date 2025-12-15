// "use client";

import UserPage from "@/app/_components/UserPage.jsx"

//
export async function generateMetadata({ params }) {
    return {
        //TODO: Je voudrais écrire le nom de l'utilisateur avant "- inkveil".
        title: " - Inkveil.",
    };
}

const User = () => {
    return (
        <div>
            <UserPage />
        </div>
    )
}

export default User;