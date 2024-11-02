import PostRegistrationForm from "@/features/auth/components/post-registration-form";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export default async function PostSignupPage() {
  return <PostRegistrationForm />;
}
