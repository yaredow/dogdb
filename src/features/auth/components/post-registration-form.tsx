"use client";

import { Separator } from "@/components/ui/separator";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useForm } from "react-hook-form";
import { PostSignupSchema, PostSignupSchemaData } from "../schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { dogBreeds } from "@/features/breeds/constants";
import MultipleSelector from "@/components/ui/mutli-select";
import { Button } from "@/components/ui/button";
import { usePostRegisteration } from "../api/use-post-registeration";
import {
  Form,
  FormField,
  FormControl,
  FormMessage,
  FormItem,
} from "@/components/ui/form";

export default function PostRegistrationForm() {
  const { mutate, isPending } = usePostRegisteration();
  const form = useForm<PostSignupSchemaData>({
    resolver: zodResolver(PostSignupSchema),
    defaultValues: {
      breed: [],
    },
  });

  const onSubmit = (data: PostSignupSchemaData) => {
    mutate({ json: data });
  };

  return (
    <Card className="w-full h-full md:w-[487px] border shadow-lg">
      <CardHeader className=" flex items-center justify-between p-7">
        <CardTitle className="text-2xl">Breed information</CardTitle>
      </CardHeader>
      <div className="px-7">
        <Separator />
      </div>
      <CardContent className="p-7">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-y-4"
          >
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
            <Button className="w-full">
              {isPending ? "Loading..." : "Submit"}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
