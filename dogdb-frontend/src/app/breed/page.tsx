import BreedPage from "@/components/breed";
import { Suspense } from "react";

export default function page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <BreedPage />
    </Suspense>
  );
}
