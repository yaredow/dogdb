"use client";

import { SigninDataType, SigninFormSchema } from "@/lib/schemas";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { z } from "zod";
import { Button } from "../ui/button";
import useSignin from "@/hooks/useSignin";

export default function SigninForm() {
  const { signin, isPending } = useSignin();

  const form = useForm<z.infer<typeof SigninFormSchema>>({
    resolver: zodResolver(SigninFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: SigninDataType) => {
    try {
      await signin(data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-full flex-grow max-w-2xl items-center justify-center gap-4"
      >
        <div className="flex flex-col space-y-6">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => {
              return (
                <FormItem>
                  <FormControl>
                    <Input {...field} placeholder="Email" type="text" />
                  </FormControl>
                  <FormMessage className="mx-2" />
                </FormItem>
              );
            }}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => {
              return (
                <FormItem>
                  <FormControl>
                    <Input {...field} placeholder="Password" type="password" />
                  </FormControl>
                  <FormMessage className="mx-2" />
                </FormItem>
              );
            }}
          />
          <Button type="submit">{!isPending ? "Sign in" : "Loading..."}</Button>
        </div>
      </form>
    </Form>
  );
}
