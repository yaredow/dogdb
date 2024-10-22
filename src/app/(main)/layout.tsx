import NavBar from "@/components/nav-bar";

type MainLayoutProps = {
  children: React.ReactNode;
};

export default function MainLayout({ children }: MainLayoutProps) {
  return (
    <div className="w-full lg:max-w-screen-2xl">
      <NavBar />
      <main className="h-full py-8 px-6 flex flex-col">{children}</main>
    </div>
  );
}
