import Link from "next/link";
import { Button } from "@/components/ui/button";
import { MessageSquareMoreIcon } from "lucide-react";

export default function ConversationToggle() {
  return (
    <div>
      <Link href="/conversations">
        <Button className="size-10 rounded-full" size="icon" variant="outline">
          <MessageSquareMoreIcon className="size-5" />
        </Button>
      </Link>
    </div>
  );
}
