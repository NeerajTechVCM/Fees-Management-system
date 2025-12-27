import { Skeleton } from "@/components/ui/skeleton"

export function Loading() {
  return (
    <div className="flex w-full justify-center items-center h-96 bg-slate-100">
        <div className="flex flex-col space-y-3">
      <Skeleton className="h-[125px] w-[250px] rounded-xl" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-[250px]" />
        <Skeleton className="h-4 w-[200px]" />
      </div>
    </div>
    </div>
  )
}
