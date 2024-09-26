import BreedPage from "@/components/breed";
import BreedSkeleton from "@/components/skeletons/breed-skeleton";
import SkeletonLoader from "@/components/skeletons/skeleton-loader";
import { Suspense } from "react";

export default function page() {
  return (
    <Suspense
      fallback={
        <SkeletonLoader
          count={20}
          SkeletonComponent={BreedSkeleton}
          className="grid w-full grid-cols-2 gap-4 md:grid-cols-4"
        />
      }
    >
      <BreedPage />
    </Suspense>
  );
}
