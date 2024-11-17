"use client";

import Image from "next/image";
import Link from "next/link";

import ConversationToggle from "@/features/conversations/components/conversation-toggle";
import UserButton from "@/features/auth/components/user-button";
import Logo from "@/assets/images/logo-light.svg";
import { NavLinks } from "@/lib/constants";

import { useSession } from "@/lib/auth-client";
import MobileNavbar from "./mobile-navbar";
import { ModeToggle } from "./mode-toggle";
import { Button } from "./ui/button";
import NavLink from "./nav-link";

export default function NavBar() {
  const { data: session, isRefetching } = useSession();

  return (
    <nav className="sticky left-0 top-0 z-10 flex w-full items-center justify-between border-b bg-background px-6 py-4">
      <Link href="/" className="flex items-center justify-between space-x-3">
        <Image
          src={Logo}
          alt="an image of a dog in an orange color"
          width={40}
          height={40}
          priority
        />
        <h1 className="text-xl font-bold">dogdb</h1>
      </Link>
      <div className="hidden flex-row items-center gap-x-4 md:flex">
        {NavLinks.map((link) => (
          <NavLink href={link.path} key={link.path}>
            {link.name}
          </NavLink>
        ))}

        <div className="ml-8 flex items-center gap-x-6">
          <MobileNavbar />
          {session && <ConversationToggle />}
          <ModeToggle />
          {!session && !isRefetching ? (
            <Button asChild>
              <Link href="/signin">Sign in</Link>
            </Button>
          ) : (
            <UserButton className="size-10" />
          )}
        </div>
      </div>
    </nav>
  );
}
