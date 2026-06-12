export default function BlogPostLoading() {
  return (
    <div className="mx-auto max-w-[760px] px-6 pb-24 pt-14">
      <div className="h-4 w-24 animate-pulse rounded-full bg-muted" />
      <div className="mt-10 h-4 w-28 animate-pulse rounded-full bg-muted" />
      <div className="mt-4 h-12 w-full animate-pulse rounded-xl bg-muted" />
      <div className="mt-3 h-12 w-2/3 animate-pulse rounded-xl bg-muted" />
      <div className="mt-6 h-4 w-48 animate-pulse rounded-full bg-muted" />
      <div className="mt-10 aspect-[16/9] animate-pulse rounded-2xl bg-muted" />
      <div className="mt-10 space-y-4">
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            className="h-4 animate-pulse rounded-full bg-muted"
            style={{ width: `${[100, 95, 88, 100, 92, 60][i]}%` }}
          />
        ))}
      </div>
    </div>
  );
}
