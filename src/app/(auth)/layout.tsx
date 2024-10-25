"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Logo from "@/assets/images/logo-light.svg";

type AuthLayoutProps = {
  children: React.ReactNode;
};

export default function AuthLayout({ children }: AuthLayoutProps) {
  const pathName = usePathname();
  const isSignin = pathName === "/signin";

  return (
    <main className=" min-h-screen">
      <div className="mx-auto max-w-screen-2xl p-4">
        <nav className="flex items-center justify-between">
          <Link href="/">
            <div className="flex items-center justify-between space-x-3">
              <Image
                src={Logo}
                alt="an image of a dog in an orange color"
                width={40}
                height={40}
                priority
              />
              <h1 className="text-xl font-bold">dogdb</h1>
            </div>
          </Link>
          <Button>
            <Link href={isSignin ? "/signup" : "/signin"}>
              {isSignin ? "Sign Up" : "Sign In"}
            </Link>
          </Button>
        </nav>
        <div className="flex flex-col pt-4 items-center justify-center md:pt-12">
          {children}
        </div>
      </div>
    </main>
  );
}
