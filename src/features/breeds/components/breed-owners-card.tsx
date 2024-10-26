"use client";

import * as React from "react";
import { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import UserAvatar from "@/features/auth/components/user-avatar";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

type User = {
  id: string;
  name: string;
  avatar: string;
  dogBreed: string;
  isOnline: boolean;
};

const currentUser: User = {
  id: "1",
  name: "Current User",
  avatar:
    "https://pickaface.net/gallery/avatar/unr_random_180410_1905_z1exb.png",
  dogBreed: "Labrador",
  isOnline: true,
};

const users: User[] = [
  {
    id: "2",
    name: "Alice Johnson",
    avatar: "https://thispersondoesnotexist.com/image",
    dogBreed: "Labrador",
    isOnline: true,
  },
  {
    id: "3",
    name: "Bob Smith",
    avatar: "https://thispersondoesnotexist.com/image",
    dogBreed: "Labrador",
    isOnline: false,
  },
  {
    id: "4",
    name: "Charlie Brown",
    avatar: "https://thispersondoesnotexist.com/image",
    dogBreed: "Labrador",
    isOnline: true,
  },
  {
    id: "5",
    name: "Diana Prince",
    avatar: "https://thispersondoesnotexist.com/image",
    dogBreed: "Labrador",
    isOnline: true,
  },
  {
    id: "6",
    name: "Ethan Hunt",
    avatar: "https://thispersondoesnotexist.com/image",
    dogBreed: "Labrador",
    isOnline: false,
  },
];

const UserItem = ({ user }: { user: User }) => (
  <div className="flex items-center space-x-4 py-2">
    <div className="relative">
      <UserAvatar avatarUrl="" />
    </div>
    <div className="flex-1 min-w-0">
      <p className="text-sm font-medium text-gray-900 truncate">{user.name}</p>
      <p className="text-xs text-gray-500 truncate">{user.dogBreed} owner</p>
    </div>
  </div>
);

export default function BreedOwnersCard() {
  const [isExpanded, setIsExpanded] = useState(false);
  const pathName = usePathname();

  const toggleExpand = () => setIsExpanded(!isExpanded);

  const filteredUsers = users.filter(
    (user) => user.dogBreed === currentUser.dogBreed,
  );

  return (
    <Card
      className={cn(
        "w-64 shadow-lg max-h-96 overflow-y-auto",
        pathName === "/conversations/new-conversation" && "hidden",
      )}
    >
      <CardHeader className="py-3">
        <CardTitle className="text-sm font-semibold text-gray-900">
          Dog Breed Buddies
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <ScrollArea className={`px-4 ${isExpanded ? "h-80" : "h-40"}`}>
          {filteredUsers.map((user) => (
            <UserItem key={user.id} user={user} />
          ))}
        </ScrollArea>
        {filteredUsers.length > 3 && (
          <button
            onClick={toggleExpand}
            className="w-full py-2 text-sm text-blue-600 hover:bg-gray-100 transition-colors duration-200"
            aria-expanded={isExpanded}
            aria-controls="user-list"
          >
            {isExpanded ? "See Less" : "See More"}
          </button>
        )}
      </CardContent>
    </Card>
  );
}
