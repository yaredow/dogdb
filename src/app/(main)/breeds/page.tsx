import BreedGrid from "@/features/breeds/components/breed-grid";
import { Loader2 } from "lucide-react";
import { Suspense } from "react";

export default function page() {
  return (
    <Suspense
      fallback={
        <Loader2 className="flex min-h-screen animate-spin items-center justify-center" />
      }
    >
      <BreedGrid />
    </Suspense>
  );
}
