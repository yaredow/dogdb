"use client";

import { NavLinks } from "@/lib/constants";
import NavLink from "./nav-link";
import MobileNavbar from "./mobile-navbar";
import Image from "next/image";
import UserButton from "@/features/auth/components/user-button";
import { authClient } from "@/lib/auth-client";
export default function NavBar() {
  return (
    <nav className="w-full px-6 py-4 flex items-center justify-between border-b">
      <Image src="/images/logo-light.svg" alt="Logo" width={60} height={60} />
      <div className="md:flex hidden flex-row items-center gap-x-4">
        {NavLinks.map((link) => (
          <NavLink href={link.path}>{link.name}</NavLink>
        ))}

        <div className="flex items-center gap-x-4 ml-8">
          <MobileNavbar />
          <UserButton className="size-12" />
        </div>
      </div>
    </nav>
  );
}
