"use client";

import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { MenuIcon, MoveRight } from "lucide-react";

import React from "react";
import { navLinks } from "@/lib/constants";
import NavLink from "@/components/header/nav-links";
import { ModeToggle } from "@/components/mode-toggle";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import UserMenu from "@/components/user-menu";
import Link from "next/link";
import Image from "next/image";
import Logo from "@/../public/images/logo-light.svg";
import ConversationToggle from "@/components/conversations/conversation-toggle";
import { usePathname } from "next/navigation";
import useConversation from "@/hooks/useConversation";
import { cn } from "@/lib/utils";
import { LoginButton } from "../auth/login-button";
import { SignupButton } from "../auth/signup-button";
import useGetUser from "@/hooks/useGetUser";
import UserAvatarSkeleton from "../skeletons/user-avatr-skeleton";

export default function Header() {
  const path = usePathname();
  const { conversationId } = useConversation();
  const { user, isFetching } = useGetUser();

  const isConversation =
    path === `/conversations/${conversationId}` || path === "/conversations";

  return (
    <header
      className={cn(
        "text-secondary-body sticky inset-0 inset-y-0 right-0 z-10 w-full border-b bg-background px-4 py-3 md:px-12",
        { "hidden md:block": isConversation },
      )}
    >
      <nav className="flex items-center justify-between">
        <Link href="/" className="flex items-center justify-center gap-2">
          <Image src={Logo} height={40} width={40} alt="An image of a dog" />
          <span className="text-xl font-semibold">Doggo</span>
        </Link>
        <div className="flex flex-row items-center justify-center gap-8">
          <div className="hidden md:flex">
            <ul className="font-main flex gap-[1.2rem]">
              {navLinks.map((navLink, index) => (
                <li key={index}>
                  <NavLink href={navLink.src}>{navLink.title}</NavLink>
                </li>
              ))}
            </ul>
          </div>
          <div className="hidden md:flex">
            <ConversationToggle />
          </div>
          <div className="hidden md:flex">
            <ModeToggle />
          </div>
          <div className="hidden cursor-pointer md:flex md:flex-row md:items-center md:gap-8">
            {isFetching ? (
              <UserAvatarSkeleton />
            ) : !user ? (
              <div className="flex flex-row gap-2">
                <LoginButton />
                <SignupButton />
              </div>
            ) : (
              <UserMenu user={user} />
            )}
          </div>{" "}
        </div>

        {/* Mobile navigation */}
        <div className="cursor-pointer text-black dark:text-white md:hidden">
          <div className="flex flex-row items-center gap-4">
            <div className="flex md:hidden">
              <ConversationToggle />
            </div>
            <Sheet>
              <SheetTrigger asChild>
                <MenuIcon />
              </SheetTrigger>
              <SheetContent side="right" className="text-black dark:text-white">
                <div>
                  <ModeToggle />
                </div>
                <div className="top-2">
                  <Avatar>
                    <AvatarImage
                      className="h-10 w-10 rounded-full"
                      src="https://pbs.twimg.com/profile_images/1754602039311478784/EmA-O4v4_400x400.jpg"
                    />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                </div>

                <hr className="mt-6 w-full flex-grow" />

                <div className="mt-8 flex flex-col gap-6">
                  <div className="flex">
                    <ul className="font-main -mx-2 flex flex-col gap-[1.2rem]">
                      {navLinks.map((navLink, index) => (
                        <li key={index}>
                          <NavLink href={navLink.src}>{navLink.title}</NavLink>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <hr className="w-full flex-grow" />

                  <div className="mt-[10px] flex justify-between gap-[8px]">
                    <div className="flex flex-row gap-[5px]">
                      <Button
                        variant="link"
                        className="flex flex-row gap-2 text-lg"
                      >
                        Login
                        <span>
                          <MoveRight />
                        </span>
                      </Button>
                    </div>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </nav>
    </header>
  );
}
