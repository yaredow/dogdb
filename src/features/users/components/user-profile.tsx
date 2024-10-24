"use client";

import { GetUserId } from "@/app/(main)/users/hooks/get-user-id";
import DefaultProfile from "@/assets/images/avatar-placeholder.png";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { User } from "better-auth";
import { CameraIcon, Loader2 } from "lucide-react";
import { useGetUser } from "../api/use-get-user";

type UserProfileProps = {
  loggedInUser: User;
};

export default function UserProfile({ loggedInUser }: UserProfileProps) {
  const userId = GetUserId();
  const { user, isFetching } = useGetUser({ userId });

  const isLoggedInUser = loggedInUser?.id === userId;
  const userData = isLoggedInUser ? loggedInUser : user;

  if (!userData || isFetching) {
    return (
      <Loader2 className="flex items-center justify-center mx-auto animate-spin h-screen" />
    );
  }

  return (
    <main className="mx-8 my-8 md:mx-40 md:my-12">
      <div className=" text-bod flex flex-col items-center justify-between gap-8 md:flex-row">
        <div className=" flex flex-row items-center gap-4">
          <div key="1" className="relative h-[100px] w-[100px]">
            <Avatar className="h-full w-full rounded-full">
              <AvatarImage
                alt="User Avatar"
                src={userData.image || DefaultProfile.src}
              />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <Button
              className="absolute bottom-0 right-0 -translate-x-1/2 translate-y-1/2 rounded-full border-2 border-white bg-white p-1 transition-colors dark:border-gray-950"
              size="icon"
              variant="outline"
            >
              <CameraIcon className="h-4 w-4 text-gray-500 dark:text-gray-400" />
              <span className="sr-only">Upload Avatar</span>
            </Button>
          </div>
          <div>
            <h1 className=" text-2xl font-bold md:text-3xl">
              Leonardo DiCaprio
            </h1>
            <p className=" text-sm">{userData?.name}</p>
          </div>
        </div>

        <div className=" flex gap-4">
          <Button variant="outline" onClick={() => {}}>
            Edit Profile
          </Button>
          <Button>My Dogs</Button>
        </div>
      </div>

      <div className=" mt-12 flex flex-col gap-8">
        <h1 className=" text-3xl font-semibold">Account</h1>
        <div className=" flex items-center justify-between">
          <div className=" h-12">
            <h4 className=" font-semibold">Full Name</h4>
            <Input className=" mt-2" type="text" onChange={() => {}} />
          </div>
          <Button className=" w-[85px]" onClick={() => {}} variant="outline">
            Change
          </Button>
        </div>

        <div className=" flex items-center justify-between">
          <div className=" h-12">
            <h4 className=" font-semibold">Username</h4>
            <Input className=" mt-2" type="text" onChange={() => {}} />
          </div>
          <Button className=" w-[85px]" onClick={() => {}} variant="outline">
            Change
          </Button>
        </div>

        <div className=" flex items-center justify-between">
          <div className=" h-12">
            <h4 className=" font-semibold ">Email Adress</h4>
            <Input className="mt-2" type="text" onChange={() => {}} />
          </div>
          <Button className=" w-[85px]" variant="outline" onClick={() => {}}>
            Change
          </Button>
        </div>

        <div className=" flex items-center justify-between">
          <div>
            <h4 className=" font-semibold">Password</h4>
            <p className=" text-sm">************</p>
          </div>

          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline" className="w-[85px]">
                Reset
              </Button>
            </DialogTrigger>
            <DialogContent className=" rounded-lg">
              <DialogHeader>
                <DialogTitle className=" mb-4">Reset your password</DialogTitle>
              </DialogHeader>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <div className=" mx-auto mt-8 flex items-center justify-center">
        <Button className=" hover:text-red-400" variant="outline">
          Log out
        </Button>
      </div>
    </main>
  );
}
