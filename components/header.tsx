import Link from "next/link"
import { Button } from "@/components/ui/button"
import { MainNav } from "@/components/main-nav"

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-full bg-farm-blue-600 flex items-center justify-center">
              <Plant className="h-5 w-5 text-white" />
            </div>
            <span className="font-bold text-xl text-farm-blue-800">Smart Farm</span>
          </Link>
        </div>
        <MainNav />
        <div className="flex items-center gap-4">
          <Button variant="outline" className="hidden md:flex">
            Log In
          </Button>
          <Button className="hidden md:flex bg-farm-blue-600 hover:bg-farm-blue-700">Get Started</Button>
        </div>
      </div>
    </header>
  )
}

import { TreesIcon as Plant } from "lucide-react"

