import Hero from "@/components/hero";
import { Suspense } from "react";
import BreedSkeleton from "@/components/skeletons/breed-skeleton";
import SkeletonLoader from "@/components/skeletons/skeleton-loader";
import HomePage from "@/components/home";

export default function Home() {
  return (
    <main className="flex flex-col gap-6">
      <Hero />
      <Suspense
        fallback={
          <SkeletonLoader
            count={30}
            SkeletonComponent={BreedSkeleton}
            className="grid w-full grid-cols-2 gap-4 md:grid-cols-4"
          />
        }
      >
        <HomePage />
      </Suspense>
    </main>
  );
}
