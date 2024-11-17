import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { DatePicker } from "@/components/date-picker";
import { UserType } from "@/lib/types";

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

  const form = useForm<UpdateProfileData>({
    resolver: zodResolver(UpdateProfileSchema),
    defaultValues: {
      bio: "",
      name: "",
      birthDate: user.birthDate,
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
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-y-4"
          >
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
                    <DatePicker {...field} />
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
                  <FormLabel>Birth Date</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder={user.bio} />
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
