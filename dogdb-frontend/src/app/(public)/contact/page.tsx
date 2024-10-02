import CardWrapper from "@/components/card-wrapper";
import ContactUsForm from "@/components/form/contact-form";

export default function Page() {
  return (
    <main className="my-auto flex min-h-[85vh] items-center justify-center">
      <CardWrapper
        title="Contact us"
        description="   Have a question or need assistance? Feel free to reach out to us
            using the form below. We're here to help!"
        isLogin={false}
        isSocial={false}
        backButtonHref="/"
        backButtonLabel="Go back to home"
      >
        <ContactUsForm />
      </CardWrapper>
    </main>
  );
}
