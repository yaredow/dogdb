"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { FcGoogle } from "react-icons/fc";
import { FaFacebook } from "react-icons/fa";

import DottedSeparator from "@/components/dotted-separator";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";
import { SignupData, SignupSchema } from "../schemas";
import { authClient } from "@/lib/auth-client";
import { toast } from "@/hooks/use-toast";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormField,
  FormControl,
  FormMessage,
  FormItem,
} from "@/components/ui/form";
import { Separator } from "@/components/ui/separator";

export default function SignupCard() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const form = useForm<SignupData>({
    resolver: zodResolver(SignupSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: SignupData) => {
    await authClient.signUp.email(values, {
      onRequest: () => {
        setIsLoading(true);
      },
      onResponse: () => {
        setIsLoading(false);
      },
      onError: (ctx) => {
        setIsLoading(false);
        toast({
          variant: "destructive",
          description: ctx.error.message,
        });
      },
      onSuccess: () => {
        toast({
          description: "Account created successfully.",
        });
        router.push("/signin");
      },
    });
  };

  return (
    <Card className=" w-full h-full md:w-[487px] border shadow-lg">
      <CardHeader className=" flex items-center justify-between p-7">
        <CardTitle className="text-2xl">Sign Up</CardTitle>
        <CardDescription>
          By signing up, you agree to our{" "}
          <Link href="/privacy">
            <span className=" text-blue-700">Privacy Policy</span>
          </Link>{" "}
          and{" "}
          <Link href="/terms">
            <span className=" text-blue-700">Terms of Service</span>
          </Link>
        </CardDescription>
      </CardHeader>
      <div className="px-7">
        <Separator />
      </div>
      <CardContent className="p-7">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className=" space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      disabled={isLoading}
                      type="text"
                      placeholder="Enter your name"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      disabled={isLoading}
                      type="email"
                      placeholder="Enter email address"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      disabled={isLoading}
                      type="password"
                      placeholder="Enter your password"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" className=" w-full" disabled={false}>
              Sign Up
            </Button>
          </form>
        </Form>
      </CardContent>
      <div className="px-7 mb-2">
        <div className="mx-7 my-2">
          <Separator />
        </div>
        <CardContent className="px-7 flex flex-col gap-y-4">
          <Button
            className="w-full flex flex-row gap-2"
            disabled={false}
            variant="secondary"
            onClick={async () => {
              authClient.signIn.social({
                provider: "google",
                callbackURL: "/",
              });
            }}
          >
            <FcGoogle size={16} /> Login with Google
          </Button>

          <Button
            className="w-full flex flex-row gap-2"
            disabled={false}
            variant="secondary"
            onClick={async () => {
              authClient.signIn.social({
                provider: "facebook",
                callbackURL: "/",
              });
            }}
          >
            <FaFacebook size={16} />
            Login with Facebook
          </Button>
        </CardContent>
        <div className="px-7 py-2">
          <Separator />
        </div>
        <CardContent className="items-center justify-center flex flex-col">
          <p>
            Already have an account?{" "}
            <Link href="/signin">
              <span className=" text-blue-700">&nbsp;Sign In</span>
            </Link>
          </p>
        </CardContent>
      </div>
    </Card>
  );
}
