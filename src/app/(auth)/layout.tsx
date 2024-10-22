"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

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
          <Image
            src="/images/logo-light.svg"
            alt="logo"
            width={70}
            height={30}
          />
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
