import SignUpClient from "@/app/_components/SignUpPage";
import { getSession } from "@/lib/auth";
import { redirect } from "next/navigation";

const Signup = async () => {
  const session = await getSession();
  if (session) {
    redirect("/");
  }

  return <SignUpClient />;
};

export default Signup;
