import StoryFormPage from "../../_components/StoryFormPage.jsx";
import { createStory } from "@/app/actions/story-actions";

const StoryForm = () => <StoryFormPage formAction={createStory} />;
export default StoryForm;
