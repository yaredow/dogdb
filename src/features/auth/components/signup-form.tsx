"use client";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { SignupFormSchema } from "@/lib/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Input } from "../../../components/ui/input";
import { Button } from "../../../components/ui/button";
import MultipleSelector from "@/components/ui/mutli-select";
import { dogBreeds } from "@/lib/constants";
import useSignup from "@/hooks/useSignup";

type signupType = z.infer<typeof SignupFormSchema>;

export default function SignupForm() {
  const { signup, isPending } = useSignup();
  const form = useForm<signupType>({
    resolver: zodResolver(SignupFormSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      passwordConfirm: "",
      breed: [],
    },
  });

  const onSubmit = async (data: signupType) => {
    try {
      await signup(data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Form {...form}>
      <form
        className="flex w-full flex-grow items-center justify-center gap-4"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <div className="flex w-full flex-col space-y-6">
          <div className="flex flex-row gap-2">
            <FormField
              control={form.control}
              name="firstName"
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormControl>
                      <Input {...field} placeholder="First Name" type="text" />
                    </FormControl>
                    <FormMessage className="mx-2" />
                  </FormItem>
                );
              }}
            />

            <FormField
              control={form.control}
              name="lastName"
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormControl>
                      <Input {...field} placeholder="Last Name" type="text" />
                    </FormControl>
                    <FormMessage className="mx-2" />
                  </FormItem>
                );
              }}
            />
          </div>

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => {
              return (
                <FormItem>
                  <FormControl>
                    <Input {...field} placeholder="Email" type="email" />
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

          <FormField
            control={form.control}
            name="passwordConfirm"
            render={({ field }) => {
              return (
                <FormItem>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="Password Confirm"
                      type="password"
                    />
                  </FormControl>
                  <FormMessage className="mx-2" />
                </FormItem>
              );
            }}
          />

          <FormField
            control={form.control}
            name="breed"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <MultipleSelector
                    {...field}
                    defaultOptions={dogBreeds}
                    placeholder="Select a dog breed you own"
                    emptyIndicator={
                      <p className="text-center text-lg leading-10 text-gray-600 dark:text-gray-400">
                        no results found.
                      </p>
                    }
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button>{!isPending ? "Sign up" : "Loading..."}</Button>
        </div>
      </form>
    </Form>
  );
}
