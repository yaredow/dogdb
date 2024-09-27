import CardWrapper from "@/components/card-wrapper";
import SigninForm from "@/components/form/signin-form";

export default function Page() {
  return (
    <CardWrapper
      title="Login"
      description="Provide your credentials to login"
      isSocial
      isLogin
      backButtonHref="/"
      backButtonLabel="Return to home"
    >
      <SigninForm />
    </CardWrapper>
  );
}
