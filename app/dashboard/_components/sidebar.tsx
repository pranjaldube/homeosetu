import Image from "next/image"
import Link from "next/link"
import { SidebarRoutes } from "./sidebar-routes"

export const Sidebar = () => {
  return (
    <div className="h-full border-r flex flex-col overflow-y-auto bg-white shadow-md">
      <Link href="/" className="p-4 flex justify-center border-b">
        <div className="relative w-40 h-12">
          <Image
            src="/logo.png"
            fill
            alt="Homeosetu"
            className="object-contain"
            priority
          />
        </div>
      </Link>
      <div className="flex flex-col w-full py-4">
        <SidebarRoutes />
      </div>
    </div>
  )
}
