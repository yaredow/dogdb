import Link from "next/link";
import { Button } from "@/components/ui/button";
import { MessageSquareMore } from "lucide-react";

export default function ConversationToggle() {
  return (
    <div>
      <Link href="/conversations">
        <Button className="rounded-full size-10" size="icon" variant="outline">
          <MessageSquareMore size={22} strokeWidth={1.5} />
        </Button>
      </Link>
    </div>
  );
}
