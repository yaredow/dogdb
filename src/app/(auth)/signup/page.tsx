import SignupCard from "@/features/auth/components/sign-up-card";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sign up",
  description: "Sign up page",
};

export default function Page() {
  return <SignupCard />;
}
