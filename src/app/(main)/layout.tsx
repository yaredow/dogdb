import NavBar from "@/components/nav-bar";

type MainLayoutProps = {
  children: React.ReactNode;
};

export default function MainLayout({ children }: MainLayoutProps) {
  return (
    <main className="min-h-screen">
      <div className="w-full lg:max-w-screen-2xl">
        <NavBar />
        <main className="h-full px-4 py-4 md:px-6 md:py-8">{children}</main>
        <footer className="h-16 w-full overflow-hidden border-t py-4 text-center">
          <p className="text-sm text-muted-foreground">
            © 2024 dogdb. All rights reserved. Dedicated to helping you find
            and care for your perfect canine companion.
          </p>
        </footer>
      </div>
    </main>
  );
}
