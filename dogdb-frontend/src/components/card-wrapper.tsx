import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import ForgetPasswordLink from "./auth/forget-password-link";
import { Button } from "./ui/button";
import Link from "next/link";

type CardWrapperProps = {
  title: string;
  description: string;
  children: React.ReactNode;
  backButtonHref: string;
  backButtonLabel: string;
  isLogin?: boolean;
  isSocial: boolean;
};

export default function CardWrapper({
  title,
  description,
  children,
  isLogin,
  backButtonHref,
  backButtonLabel,
}: CardWrapperProps) {
  return (
    <Card className="mx-auto min-w-md">
      <CardHeader>
        <CardTitle className="text-2xl">{title}</CardTitle>{" "}
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        {children}
        {isLogin && <ForgetPasswordLink />}
      </CardContent>
      <CardFooter>
        <Button
          className="mx-auto flex items-center justify-center"
          variant="link"
          asChild
        >
          <Link href={backButtonHref}>{backButtonLabel}</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
