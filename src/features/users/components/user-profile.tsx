"use client";

import Image from "next/image";

import { User as AuthUser } from "better-auth";
import {
  Mail,
  MailIcon,
  MapPinIcon,
  SearchIcon,
  UsersIcon,
} from "lucide-react";
import { useMedia } from "react-use";
import { User as PrismsUser } from "@prisma/client";

import BannerPlaceholder from "@/assets/images/banner-placeholder.jpeg";
import { Tabs, TabsTrigger, TabsContent, TabsList } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";

import UserAvatar from "./user-avatar";
import FollowButton from "./follow-button";
import ProfileMenu from "./profile-menu";
import { useGetFollowers } from "../api/use-get-followers";
import { useUserId } from "../hooks/use-user-id";
import { useStartConversation } from "@/features/conversations/api/use-start-conversation";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

type UserProfileProps = {
  user: PrismsUser | AuthUser;
  isCurrentUser: boolean;
};

export default function UserProfile({ user, isCurrentUser }: UserProfileProps) {
  const isDesktop = useMedia("(min-width: 1024px)", true);
  const userId = useUserId();
  const { data } = useGetFollowers({ userId });
  const { startConversation, isPending } = useStartConversation({ userId });
  const router = useRouter();

  const handleStartConversation = () => {
    startConversation(
      { query: { userId } },
      {
        onSuccess: (data) => {
          router.push(`/conversations/${data.data.id}`);
        },
      },
    );
  };

  return (
    <div className="mx-auto max-w-6xl p-0 md:p-4">
      <div className={cn("flex justify-end", { hidden: isDesktop })}>
        <Button variant="ghost" size="icon">
          <SearchIcon />
        </Button>
        <ProfileMenu user={user} isBlocked={data?.isBlocked} />
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <div className="col-span-2 overflow-hidden shadow">
          <div>
            <div className="relative w-full">
              <Image
                src={BannerPlaceholder}
                alt="Cover"
                className="h-40 w-full rounded-md object-cover md:h-44"
                width="800"
                height="200"
              />
              <div className="absolute -bottom-10 left-4">
                <UserAvatar avatarUrl={user.image} size={80} />
              </div>
            </div>

            <div className="m-2 flex flex-row items-center justify-end gap-x-2 md:flex-row">
              {!isCurrentUser ? (
                <>
                  {!data?.isBlocked && (
                    <Button
                      variant="outline"
                      size="icon"
                      className="rounded-full"
                      onClick={handleStartConversation}
                      disabled={isPending}
                    >
                      <Mail size={20} />
                    </Button>
                  )}

                  <FollowButton />

                  {isDesktop && (
                    <ProfileMenu isBlocked={data?.isBlocked} user={user} />
                  )}
                </>
              ) : (
                <Button variant="outline">Edit profile</Button>
              )}
            </div>
          </div>

          <div className="flex flex-col justify-start gap-y-3 px-4 pb-4 md:flex-row md:justify-between">
            <div className="flex flex-col gap-y-2">
              <div className="mt-2 flex flex-col gap-1">
                <h2 className="text-xl font-bold md:text-2xl">{`${user.name}`}</h2>
              </div>

              <div className="flex items-center gap-2">
                <div className="text-sm">
                  <span className="text-blue-500">12</span> followers
                </div>
                <div className="text-sm">
                  <span className="text-blue-500">12</span> following
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="rounded-lg px-4 shadow">
          <h3 className="text-lg font-semibold">Intro</h3>
          <ul className="mt-2 space-y-4 text-sm">
            <li className="flex items-center">
              {/* <Dog className="mr-2 h-5 w-5 text-muted-foreground" />{" "} */}
              {/* {`${user.} owner`} */}
            </li>
            <li className="flex items-center">
              <MapPinIcon className="mr-2 h-5 w-5 text-muted-foreground" />{" "}
              Lives in{" "}
              <span className="ml-[4px] font-semibold">
                Addis Ababa, Ethiopia
              </span>
            </li>
            <li className="flex items-center">
              <UsersIcon className="mr-2 h-5 w-5 text-muted-foreground" />{" "}
              Followed by{" "}
              <span className="ml-[4px] font-semibold">12.5k people</span>
            </li>
            <li className="flex items-center">
              <MailIcon className="mr-2 h-5 w-5 text-muted-foreground" /> Email
              <span className="ml-[4px] font-semibold">
                <a href="#">{user.email}</a>
              </span>{" "}
            </li>
          </ul>
        </div>
      </div>

      {!data?.isBlocked ? (
        <div>
          <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-3">
            <div className="rounded-lg p-4 shadow">
              <h3 className="text-lg font-semibold">About</h3>
              {/* <p className="mt-2 text-sm text-muted-foreground">
                {user.bio || "Dog lover"}
              </p> */}
            </div>
            <div></div>
            <div className="col-span-2 rounded-lg p-4 shadow">
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div>
                  <h4 className="text-sm font-semibold">Marketing expertise</h4>
                  <p className="mt-1 text-sm text-blue-500"></p>
                  <p className="mt-2 text-sm font-semibold">
                    Open to networking
                  </p>
                  <p className="text-green-500">Yes</p>
                </div>
                <div>
                  <h4 className="text-sm font-semibold">Marketing interests</h4>
                  <p className="mt-1 text-sm text-blue-500"></p>
                  <p className="mt-2 text-sm font-semibold">Open to advising</p>
                  <p className="text-green-500">Yes</p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-4 w-full rounded-lg p-4 shadow">
            <Tabs defaultValue="posts" className="h-full w-full">
              <TabsList className="flex w-full flex-row justify-between">
                <TabsTrigger value="posts">Posts</TabsTrigger>
                <TabsTrigger value="replies">Replies</TabsTrigger>
                <TabsTrigger value="medias">Medias</TabsTrigger>
              </TabsList>
              <TabsContent value="posts" className="mx-2">
                No post are available
              </TabsContent>
              <TabsContent value="replies" className="mx-2">
                No replies are available
              </TabsContent>
              <TabsContent value="medias" className="mx-2">
                No medias are available
              </TabsContent>
            </Tabs>
          </div>
        </div>
      ) : (
        <div className="flex h-full items-center justify-center">
          <h1>{`@${user.name.toLowerCase()} is blocked`}</h1>
        </div>
      )}
    </div>
  );
}
