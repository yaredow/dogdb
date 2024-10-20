type SkeletonLoaderProps = {
  count: number;
  SkeletonComponent: React.ComponentType;
  className?: string;
};

export default function SkeletonLoader({
  count,
  SkeletonComponent,
  className,
}: SkeletonLoaderProps) {
  return (
    <div className={className}>
      {Array.from({ length: count }).map((_, index) => (
        <SkeletonComponent key={index} />
      ))}
    </div>
  );
}
