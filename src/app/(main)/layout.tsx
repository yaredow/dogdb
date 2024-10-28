import NavBar from "@/components/nav-bar";

type MainLayoutProps = {
  children: React.ReactNode;
};

export default function MainLayout({ children }: MainLayoutProps) {
  return (
    <main className="min-h-screen">
      <div className="w-full lg:max-w-screen-2xl">
        <NavBar />
        <main className="h-full py-8 px-6">{children}</main>
        <footer className="border-t py-4 h-16 overflow-hidden w-full text-center">
          <p className="text-sm text-muted-foreground">
            © 2024 dogdb. All rights reserved. Dedicated to helping you find
            and care for your perfect canine companion.
          </p>
        </footer>
      </div>
    </main>
  );
}
