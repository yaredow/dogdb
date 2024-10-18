import CardWrapper from "@/components/card-wrapper";
import SigninForm from "@/components/form/signin-form";

export default function Page() {
  return (
    <main className="my-auto flex min-h-[85vh] items-center justify-center w-full">
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
    </main>
  );
}
