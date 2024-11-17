"use client";

import ContactUsCard from "@/features/contact/components/contac-us-card";
import UpdateProfileForm from "@/features/users/components/update-profile-from";
import { useSession } from "@/lib/auth-client";

export default function Page() {
  const { data: session } = useSession();

  return (
    <main className="flex min-h-[calc(85vh-100px)] items-center justify-center">
      <UpdateProfileForm user={session?.user} onCancel={() => {}} />
    </main>
  );
}
