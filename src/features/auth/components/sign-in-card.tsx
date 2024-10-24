"use client";

import { Input } from "@/components/ui/input";
import { FaFacebook } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { SigninData, SigninSchema } from "../schemas";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormField,
  FormControl,
  FormMessage,
  FormItem,
} from "@/components/ui/form";
import { authClient } from "@/lib/auth-client";
import { toast } from "@/hooks/use-toast";
import { Separator } from "@/components/ui/separator";

export default function SignInCard() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const form = useForm<SigninData>({
    resolver: zodResolver(SigninSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: SigninData) => {
    await authClient.signIn.email(values, {
      onRequest: () => {
        setIsLoading(true);
      },
      onResponse: () => {
        setIsLoading(false);
      },
      onError: (ctx) => {
        toast({
          variant: "default",
          description: ctx.error.message,
        });
      },
      onSuccess: () => {
        router.push("/");
      },
    });
  };

  return (
    <Card className=" w-full h-full md:w-[487px] border shadow-lg">
      <CardHeader className=" flex items-center justify-between p-7">
        <CardTitle className="text-2xl">Welcome Back</CardTitle>
      </CardHeader>
      <div className="px-7">
        <Separator />
      </div>
      <CardContent className="p-7">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className=" space-y-4">
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

            <Button type="submit" className="w-full" disabled={false}>
              {isLoading ? "Loading..." : "Login"}
            </Button>
          </form>
        </Form>
      </CardContent>

      <div className="px-7">
        <CardContent className="px-7 flex flex-col gap-y-4">
          <Button
            className="w-full flex flex-row gap-2"
            disabled={false}
            variant="secondary"
            onClick={() => {
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
            onClick={() => {
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
        <CardContent className="justify-center flex items-center">
          <p>
            Don&apos;t have an account?{" "}
            <Link href="/signup">
              <span className=" text-blue-700">&nbsp;Sign Up</span>
            </Link>
          </p>
        </CardContent>
      </div>
    </Card>
  );
}
