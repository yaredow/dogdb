import Hero from "@/components/Hero";
import BreedGrid from "@/features/breeds/components/breed-grid";

export default function Page() {
  return (
    <main className="flex min-h-screen flex-col gap-y-6">
      <Hero />
      <BreedGrid />
    </main>
  );
}
