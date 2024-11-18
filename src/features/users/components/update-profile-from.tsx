"use client";

import { ChangeEvent, useRef } from "react";
import { ImageIcon } from "lucide-react";
import Image from "next/image";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { UserType } from "@/lib/types";
import { cn } from "@/lib/utils";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { UpdateProfileData, UpdateProfileSchema } from "../schemas";
import useUpdateProfile from "../api/use-update-profile";
import { useUserId } from "../hooks/use-user-id";
import DatePicker from "@/components/date-picker";
import { format } from "date-fns";

type UpdateProfileFormProps = {
  user: UserType | undefined;
  onCancel: () => void;
};

export default function UpdateProfileForm({
  user,
  onCancel,
}: UpdateProfileFormProps) {
  const userId = useUserId();
  const { updateProfile, isPending } = useUpdateProfile();
  const inputRef = useRef<HTMLInputElement>(null);

  const form = useForm<UpdateProfileData>({
    resolver: zodResolver(UpdateProfileSchema),
    defaultValues: {
      bio: "",
      name: "",
      image: undefined,
    },
  });

  const onSubmit = (values: UpdateProfileData) => {
    updateProfile({
      form: {
        ...values,
        birthDate: values.birthDate.toISOString(),
      },
      param: { userId },
    });
  };

  const handleImageChange = (Event: ChangeEvent<HTMLInputElement>) => {
    const file = Event.target.files?.[0];

    if (file) {
      form.setValue("image", file);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Edit profile</CardTitle>
      </CardHeader>
      <div className="px-7">
        <Separator />
      </div>
      <CardContent>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit, (error) =>
              console.error("Error from server", error),
            )}
            className="flex flex-col space-y-4"
          >
            <div className="my-2">
              <FormField
                control={form.control}
                name="image"
                render={({ field }) => (
                  <div className="flex flex-col space-y-4">
                    <div className="flex items-center space-x-5">
                      {field.value ? (
                        <div className="relative size-[72px] overflow-hidden rounded-md">
                          <Image
                            src={
                              field.value instanceof File
                                ? URL.createObjectURL(field.value)
                                : field.value
                            }
                            alt="Logo"
                            className="object-cover"
                            fill
                          />
                        </div>
                      ) : (
                        <Avatar className="size-[72px]">
                          <AvatarFallback>
                            <ImageIcon className="size-[36px] text-neutral-400" />
                          </AvatarFallback>
                        </Avatar>
                      )}
                      <div className="flex flex-col">
                        <p className="text-sm">Profile picture</p>
                        <p className="text-sm text-muted-foreground">
                          JPG, PNG, SVG or JPEG up to 1MB
                        </p>
                        <input
                          type="file"
                          ref={inputRef}
                          className="hidden"
                          accept=".jpg, .png, .jpeg, .svg"
                          disabled={isPending}
                          onChange={handleImageChange}
                        />
                        {field.value ? (
                          <Button
                            type="button"
                            disabled={isPending}
                            variant="destructive"
                            size="xs"
                            className="mt-2 w-fit"
                            onClick={() => {
                              field.onChange(null);
                              inputRef.current?.click();
                              if (inputRef.current) {
                                inputRef.current.value = "";
                              }
                            }}
                          >
                            Remove Image
                          </Button>
                        ) : (
                          <Button
                            type="button"
                            disabled={isPending}
                            variant="teritery"
                            size="xs"
                            className="mt-2 w-fit"
                            onClick={() => inputRef.current?.click()}
                          >
                            Upload Image
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input
                      disabled={isPending}
                      type="text"
                      placeholder={user?.name}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="birthDate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Birth Date</FormLabel>
                  <FormControl>
                    <DatePicker
                      {...field}
                      placeholder={
                        user.birthFate
                          ? format(user.birthdate, "PPP")
                          : "Select your birth date"
                      }
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="bio"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Bio</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder={user?.bio ? user.bio : "Add a bio"}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex items-center justify-between">
              <Button
                type="reset"
                variant="secondary"
                disabled={isPending}
                onClick={onCancel}
                className={cn(!onCancel && "invisible")}
              >
                Cancel
              </Button>

              <Button type="submit" disabled={isPending}>
                Update profile
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
