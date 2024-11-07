import { Button } from "@/components/ui/button";
import ContactUsCard from "@/features/contact/components/contac-us-card";

export default function Page() {
  return (
    <main className="flex items-center justify-center min-h-[calc(85vh-100px)]">
      <div className="flex flex-col gap-y-4">
        <Button variant="primary">Primary</Button>
        <Button variant="secondary">Secondary</Button>
        <Button variant="outline">Outline</Button>
        <Button variant="ghost">Ghost</Button>
        <Button variant="destructive">Destructive</Button>
      </div>
    </main>
  );
}
