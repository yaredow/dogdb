"use client";

import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Camera, MailIcon, MapPinIcon, Send, UsersIcon } from "lucide-react";
import Image from "next/image";
import BannerPlaceholder from "@/../public/images/secondary-banner-placeholder.jpg";
import DefaultPfp from "@/../public/images/Default_pfp.svg";
import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { DecodedToken, User } from "@/types";
import UserButtons from "./profile-buttons";
import ProfileMenu from "./profile-menu";
import { useDebounceFn } from "@/lib/debounce";
import useGetBlockStatus from "@/hooks/useGetBlockStatus";
import useGetFollowStatus from "@/hooks/useGetFollowStatus";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";

type PublicUSerProfileProps = {
  currentUser: DecodedToken;
  otherUser: User;
  isCurrentUser: boolean;
};

export default function UserPublicProfile({
  currentUser,
  otherUser,
  isCurrentUser,
}: PublicUSerProfileProps) {
  const [newPost, setNewPost] = useState("");
  const user = isCurrentUser ? currentUser : otherUser;
  const { isBlocked, refetch: refetchBlockStatus } = useGetBlockStatus(
    otherUser.id,
  );
  const { isFollowing, refetch: refetchFollowStatus } = useGetFollowStatus(
    otherUser.id,
  );
  const debounceFollowStatus = useDebounceFn(refetchFollowStatus, 500);
  const debounceBlockStatus = useDebounceFn(refetchBlockStatus, 500);

  const handlePostSubmit = () => {
    console.log("Post submitted:", newPost);
    setNewPost("");
  };

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
              <Avatar className="h-24 w-24 rounded-full border-4">
                <AvatarImage
                  src={user.image || DefaultPfp.src}
                  alt="John Smith"
                />
                <AvatarFallback className="text-2xl text-muted-foreground">
                  MM
                </AvatarFallback>
              </Avatar>
            </div>
          </div>

          <div className="mt-6 p-4">
            <div className="flex flex-col justify-start gap-4">
              <div className="mt-2 flex flex-col gap-1">
                <h2 className="text-xl font-bold md:text-2xl">{`${user.firstName} ${user.lastName}`}</h2>
                {/*  <p className="text-sm text-muted-foreground">{`${user.breed.breedName} owner`}</p> */}
              </div>

              <div className="flex items-center gap-2">
                <div className="text-sm">
                  <span className="text-blue-500">12</span> followers
                </div>
                <div className="text-sm">
                  <span className="text-blue-500">12</span> following
                </div>
              </div>

              {!isCurrentUser ? (
                <div className="flex space-x-2">
                  <UserButtons
                    user={otherUser}
                    isBlocked={isBlocked}
                    isFollowing={isFollowing}
                    debounceFollowStatus={debounceFollowStatus}
                    debounceBlockStatus={debounceBlockStatus}
                  />
                  <ProfileMenu
                    user={otherUser}
                    isBlocked={isBlocked}
                    debounceBlockStatus={debounceBlockStatus}
                  />
                </div>
              ) : null}
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

      {!isBlocked ? (
        <div>
          <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-3">
            <div className="rounded-lg p-4 shadow">
              <h3 className="text-lg font-semibold">About</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                {user.bio || "Dog lover"}
              </p>
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
          <h1>{`@${user.userName?.toLowerCase()} is blocked`}</h1>
        </div>
      )}

      <Dialog>
        <DialogTrigger asChild>
          <Button className="fixed bottom-8 right-8 rounded-full" size="icon">
            <Send className="w-4 h-4" />
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create a new post</DialogTitle>
          </DialogHeader>
          <Textarea
            placeholder="What's on your mind?"
            value={newPost}
            onChange={(e) => setNewPost(e.target.value)}
            className="min-h-[100px]"
          />
          <div className="flex justify-between items-center mt-4">
            <Button variant="outline" size="icon">
              <Camera className="w-4 h-4" />
            </Button>
            <Button onClick={handlePostSubmit}>Post</Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
