import UploadPage from "@/app/_components/UploadPage.jsx"

export async function generateMetadata({ params }) {
    return {
        title: "Téléversement - Inkveil.",
    };
}

const Upload = () => {
    return (
        <div>
            <UploadPage />
        </div>
    )
}

export default Upload;