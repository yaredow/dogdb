"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormField,
  FormControl,
  FormMessage,
  FormItem,
} from "@/components/ui/form";
import { Separator } from "@/components/ui/separator";
import {
  ContactUsFromData,
  ContactUsFromSchema,
} from "@/features/contact/schemas";
import { Textarea } from "@/components/ui/textarea";

export default function ContactUsCard() {
  const form = useForm<ContactUsFromData>({
    resolver: zodResolver(ContactUsFromSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      message: "",
    },
  });

  const onSubmit = async (values: ContactUsFromData) => {
    console.log(values);
  };

  return (
    <Card className="w-full h-full md:w-[487px] border shadow-lg">
      <CardHeader className=" flex items-center justify-between p-7">
        <CardTitle className="text-2xl">Contact Us</CardTitle>
        <CardDescription>
          Have a question, feedback, or need help? We’re here for you! Fill out
          the form below, and we’ll get back to you as soon as possible.
        </CardDescription>
      </CardHeader>
      <div className="px-7">
        <Separator />
      </div>
      <CardContent className="p-7">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <div className=" flex flex-col space-y-6">
              <div className="flex flex-col gap-4 md:flex-row">
                <div className=" w-full md:w-1/2">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => {
                      return (
                        <FormItem>
                          <FormControl>
                            <Input
                              {...field}
                              placeholder="Full name"
                              type="text"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      );
                    }}
                  />
                </div>

                <div className=" w-full md:w-1/2">
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => {
                      return (
                        <FormItem>
                          <FormControl>
                            <Input
                              {...field}
                              placeholder="Email"
                              type="email"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      );
                    }}
                  />
                </div>
              </div>

              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => {
                  return (
                    <FormItem>
                      <FormControl>
                        <Input {...field} placeholder="Phone" type="phone" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  );
                }}
              />

              <FormField
                control={form.control}
                name="message"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Textarea
                        placeholder="Write your message here"
                        className="resize-none"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button>Submit</Button>
            </div>
          </form>
        </Form>{" "}
      </CardContent>
    </Card>
  );
}
