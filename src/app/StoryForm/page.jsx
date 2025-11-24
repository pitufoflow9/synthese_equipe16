"use client";

import StoryFormPage from "../_components/StoryFormPage.jsx"
import { addHistoire } from "@/app/actions/histoires-actions";

const StoryForm = () => {
    return (
        <div>
            <StoryFormPage formAction={addHistoire} />
        </div>
    )
}

export default StoryForm;