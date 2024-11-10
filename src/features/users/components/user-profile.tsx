"use client";

import { User as PrismsUser } from "@prisma/client";
import { User as AuthUser } from "better-auth";
import Image from "next/image";
import UserAvatar from "./user-avatar";
import BannerPlaceholder from "@/assets/images/banner-placeholder.jpeg";
import { MailIcon, MapPinIcon, UsersIcon } from "lucide-react";
import FollowButton from "./follow-button";
import { Tabs, TabsTrigger, TabsContent, TabsList } from "@/components/ui/tabs";
import { useGetFollowers } from "../api/use-get-followers";
import { useUserId } from "../hooks/use-user-id";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import ProfileMenu from "./profile-menu";

type UserProfileProps = {
  user: PrismsUser | AuthUser;
  isCurrentUser: boolean;
};

export default function UserProfile({ user, isCurrentUser }: UserProfileProps) {
  const userId = useUserId();
  const router = useRouter();
  const { data } = useGetFollowers({ userId });

  const handleStartConversation = () => {};

  return (
    <div className="mx-auto max-w-6xl md:p-4">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <div className="col-span-2 overflow-hidden rounded-lg shadow">
          <div className="relative w-full">
            <Image
              src={BannerPlaceholder}
              alt="Cover"
              className="h-48 w-full object-cover"
              width="800"
              height="200"
            />
            <div className="absolute -bottom-10 left-4">
              <UserAvatar avatarUrl={user.image} size={80} />
            </div>
          </div>

          <div className="mt-6 flex items-center justify-start p-4 md:justify-between">
            <div className="flex flex-col justify-start gap-4 md:justify-between">
              <div className="mt-2 flex flex-col gap-1">
                <h2 className="text-xl font-bold md:text-2xl">{`${user.name}`}</h2>
                {/* <p className="text-sm text-muted-foreground">{`${user.breed.breedName} owner`}</p> */}
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

            <div className="flex flex-col items-center gap-2 md:flex-row">
              {!isCurrentUser && (
                <>
                  <FollowButton />
                  <Button variant="outline" onClick={handleStartConversation}>
                    Message
                  </Button>
                  <ProfileMenu isBlocked={data?.isBlocked} user={user} />
                </>
              )}
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
