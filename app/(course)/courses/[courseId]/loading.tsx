export default function Loading() {
  return (
    <div className="flex flex-col max-w-4xl mx-auto p-6">
      <div className="h-8 w-64 bg-muted animate-pulse rounded mb-6" />
      <div className="aspect-video bg-muted animate-pulse rounded-lg mb-6" />
      <div className="space-y-3">
        <div className="h-4 w-full bg-muted animate-pulse rounded" />
        <div className="h-4 w-3/4 bg-muted animate-pulse rounded" />
      </div>
    </div>
  )
}
