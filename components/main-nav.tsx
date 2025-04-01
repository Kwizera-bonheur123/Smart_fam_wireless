"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Droplet, Home, LineChart, Menu, TreesIcon as Plant, Thermometer, X } from "lucide-react"

export function MainNav() {
  const pathname = usePathname()
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false)

  const routes = [
    {
      href: "/",
      label: "Home",
      icon: Home,
      active: pathname === "/",
    },
    {
      href: "/dashboard",
      label: "Dashboard",
      icon: LineChart,
      active: pathname === "/dashboard",
    },
    {
      href: "/temperature",
      label: "Temperature",
      icon: Thermometer,
      active: pathname === "/temperature",
    },
    {
      href: "/humidity",
      label: "Humidity",
      icon: Droplet,
      active: pathname === "/humidity",
    },
    {
      href: "/soil-moisture",
      label: "Soil Moisture",
      icon: Plant,
      active: pathname === "/soil-moisture",
    },
  ]

  return (
    <div className="flex items-center">
      <div className="hidden md:flex gap-6 mr-6">
        {routes.map((route) => (
          <Link
            key={route.href}
            href={route.href}
            className={cn(
              "flex items-center text-sm font-medium transition-colors hover:text-farm-blue-600",
              route.active ? "text-farm-blue-600" : "text-muted-foreground",
            )}
          >
            <route.icon className="w-4 h-4 mr-2" />
            {route.label}
          </Link>
        ))}
      </div>
      <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
        {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
      </Button>
      {mobileMenuOpen && (
        <div className="absolute top-16 left-0 right-0 bg-white shadow-md z-50 md:hidden">
          <div className="flex flex-col p-4 space-y-3">
            {routes.map((route) => (
              <Link
                key={route.href}
                href={route.href}
                className={cn(
                  "flex items-center text-sm font-medium p-2 rounded-md transition-colors hover:bg-farm-blue-50",
                  route.active ? "bg-farm-blue-50 text-farm-blue-600" : "text-muted-foreground",
                )}
                onClick={() => setMobileMenuOpen(false)}
              >
                <route.icon className="w-4 h-4 mr-2" />
                {route.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

