import { Button } from "../ui/button";

export default function AuthButtons() {
  return (
    <div className="flex flex-row gap-2 items-center justify-center">
      <Button variant="default" className="w-full sm:w-auto">
        Sign In
      </Button>
      <Button variant="outline" className="w-full sm:w-auto">
        Sign Up
      </Button>
    </div>
  );
}
