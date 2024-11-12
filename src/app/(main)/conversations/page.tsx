import { getConversations } from "@/features/conversations/queries";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export default async function CoversationsPage() {
  const session = await auth.api.getSession({
    headers: headers(),
  });

  if (!session) {
    redirect("/signin");
  }

  const conversations = await getConversations();

  if (conversations?.length === 0) {
    redirect("/conversations/new-conversation");
  } else {
    redirect(`/conversations/${conversations?.[0].id}`);
  }
}
