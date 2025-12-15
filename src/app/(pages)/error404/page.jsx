import Error404Page from "@/app/_components/Error404Page.jsx"

export async function generateMetadata({ params }) {
    return {
        title: "Erreur 404",
    };
}

const Error404 = () => {
    return (
        <div>
            <Error404Page />
        </div>
    );
};

export default Error404;
