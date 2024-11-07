import Link from "next/link";
import { Button } from "@/components/ui/button";
import { MessageSquareMoreIcon } from "lucide-react";

export default function ConversationToggle() {
  return (
    <div>
      <Link href="/conversations">
        <Button className="rounded-full size-10" size="icon" variant="outline">
          <MessageSquareMoreIcon className="size-12" />
        </Button>
      </Link>
    </div>
  );
}
