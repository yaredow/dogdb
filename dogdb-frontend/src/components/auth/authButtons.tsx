import Link from "next/link";
import { Button } from "../ui/button";

export default function AuthButtons() {
  return (
    <div className="flex flex-row gap-2 items-center justify-center">
      <Link href="/auth/signin">
        <Button variant="default" className="w-full sm:w-auto">
          Sign In
        </Button>
      </Link>

      <Link href="/auth/signup">
        <Button variant="outline" className="w-full sm:w-auto">
          Sign Up
        </Button>
      </Link>
    </div>
  );
}
