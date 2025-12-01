import SignUpClient from "../../_components/SignUpPage";
import { getSession } from "@/lib/auth";
import { redirect } from "next/navigation";
import { signUpWithEmail } from "@/app/actions/auth-actions";

const SignUp = async () => {
  const session = await getSession();
  if (session) {
    redirect("/");
  }

  return <SignUpClient formAction={signUpWithEmail} />;
};

export default SignUp;
