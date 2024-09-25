import CardWrapper from "@/components/card-wrapper";
import SignupForm from "@/components/form/signup-form";

export default function Page() {
  return (
    <CardWrapper
      title="Sign up"
      description="Fill the form to create an account"
      isSocial
      backButtonHref="/auth/signin"
      backButtonLabel="Already have an account?"
    >
      <SignupForm />
    </CardWrapper>
  );
}
