"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Sheet, SheetTrigger, SheetContent } from "./ui/sheet";
import { Button } from "./ui/button";
import { NavLinks } from "@/lib/constants";
import NavLink from "./nav-link";
import { MenuIcon } from "lucide-react";

export default function MobileNavbar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathName = usePathname();

  useEffect(() => {
    setIsOpen(false);
  }, [pathName]);

  return (
    <Sheet open={isOpen} modal={false} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button size="icon" variant="secondary" className="lg:hidden">
          <MenuIcon className="size-4 text-neutral-500" />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="p-0">
        {NavLinks.map((link) => (
          <NavLink href={link.path} key={link.path}>
            {link.name}
          </NavLink>
        ))}
      </SheetContent>
    </Sheet>
  );
}
