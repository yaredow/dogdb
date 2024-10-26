"use client";

import { NavLinks } from "@/lib/constants";
import NavLink from "./nav-link";
import MobileNavbar from "./mobile-navbar";
import Image from "next/image";
import UserButton from "@/features/auth/components/user-button";
import Link from "next/link";
import Logo from "@/assets/images/logo-light.svg";
import { authClient } from "@/lib/auth-client";
import { Button } from "./ui/button";
import ConversationToggle from "@/features/conversations/components/conversation-toggle";

export default function NavBar() {
  const { data: session, isRefetching, isPending } = authClient.useSession();
  const isLoading = isRefetching || isPending;

  return (
    <nav className="w-full px-6 py-4 flex items-center justify-between border-b">
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
      <div className="md:flex hidden flex-row items-center gap-x-4">
        {NavLinks.map((link) => (
          <NavLink href={link.path} key={link.path}>
            {link.name}
          </NavLink>
        ))}

        <div className="flex items-center gap-x-6 ml-8">
          {session && <ConversationToggle />}
          <MobileNavbar />
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
