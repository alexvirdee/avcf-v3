export default function BlogLoading() {
  return (
    <div className="mx-auto max-w-[1200px] px-6 pb-20 pt-14 md:px-8 md:pt-20">
      <div className="mx-auto max-w-[800px] text-center">
        <div className="mx-auto h-4 w-32 animate-pulse rounded-full bg-muted" />
        <div className="mx-auto mt-5 h-12 w-3/4 animate-pulse rounded-xl bg-muted" />
        <div className="mx-auto mt-5 h-5 w-1/2 animate-pulse rounded-full bg-muted" />
      </div>
      <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            className="overflow-hidden rounded-lg border border-border bg-card shadow-sm"
          >
            <div className="aspect-[16/9] animate-pulse bg-muted" />
            <div className="space-y-3 p-6">
              <div className="h-5 w-4/5 animate-pulse rounded-full bg-muted" />
              <div className="h-4 w-full animate-pulse rounded-full bg-muted" />
              <div className="h-4 w-2/3 animate-pulse rounded-full bg-muted" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
