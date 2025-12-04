import SignUpClient from "../../_components/SignUpPage";
import { getSession } from "@/lib/auth";
import { redirect } from "next/navigation";

const SignUp = async () => {
  const session = await getSession();
  if (session) {
    redirect("/");
  }

  return <SignUpClient />;
};

export default SignUp;
