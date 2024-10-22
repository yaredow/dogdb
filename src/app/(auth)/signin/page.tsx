import SignInCard from "@/features/auth/components/sign-in-card";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sign up",
  description: "Sign up page",
};

export default function Page() {
  return <SignInCard />;
}
