export default function Loading() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="w-80 p-8 rounded-lg border border-border">
        <div className="h-8 w-32 bg-muted animate-pulse rounded mx-auto mb-6" />
        <div className="space-y-4">
          <div className="h-10 bg-muted animate-pulse rounded" />
          <div className="h-10 bg-muted animate-pulse rounded" />
          <div className="h-10 bg-muted animate-pulse rounded" />
        </div>
      </div>
    </div>
  )
}
