import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Header } from "@/components/header"
import { Droplet, Leaf, TreesIcon as Plant, Thermometer } from "lucide-react"

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="farm-gradient py-20 md:py-32 text-white">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
              <div className="space-y-4">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  Smart Farming for a Sustainable Future
                </h1>
                <p className="max-w-[600px] text-white/90 md:text-xl">
                  Monitor your farm's vital signs in real-time. Make data-driven decisions to optimize crop yield and
                  resource usage.
                </p>
                <div className="flex flex-col sm:flex-row gap-3 pt-4">
                  <Link href="/dashboard">
                    <Button size="lg" className="bg-white text-farm-blue-600 hover:bg-gray-100">
                      View Dashboard
                    </Button>
                  </Link>
                  <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                    Learn More
                  </Button>
                </div>
              </div>
              <div className="flex justify-center">
                <div className="w-full max-w-md p-4 bg-white/10 backdrop-blur-sm rounded-2xl shadow-lg">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-white/20 p-4 rounded-xl flex flex-col items-center">
                      <Thermometer className="h-8 w-8 mb-2" />
                      <span className="text-sm font-medium">Temperature</span>
                      <span className="text-2xl font-bold">24°C</span>
                    </div>
                    <div className="bg-white/20 p-4 rounded-xl flex flex-col items-center">
                      <Droplet className="h-8 w-8 mb-2" />
                      <span className="text-sm font-medium">Humidity</span>
                      <span className="text-2xl font-bold">65%</span>
                    </div>
                    <div className="bg-white/20 p-4 rounded-xl flex flex-col items-center">
                      <Plant className="h-8 w-8 mb-2" />
                      <span className="text-sm font-medium">Soil Moisture</span>
                      <span className="text-2xl font-bold">42%</span>
                    </div>
                    <div className="bg-white/20 p-4 rounded-xl flex flex-col items-center">
                      <Leaf className="h-8 w-8 mb-2" />
                      <span className="text-sm font-medium">Growth</span>
                      <span className="text-2xl font-bold">Good</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-12 md:py-24 bg-white">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-farm-blue-100 px-3 py-1 text-sm text-farm-blue-800">
                  Features
                </div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-farm-blue-900">
                  Smart Monitoring Solutions
                </h2>
                <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Our system provides comprehensive monitoring for your farm's critical parameters
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-3 lg:gap-12 mt-12">
              {/* Temperature Feature */}
              <div className="farm-card p-6">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-farm-blue-100 text-farm-blue-600 mb-4">
                  <Thermometer className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold text-farm-blue-900">Temperature Monitoring</h3>
                <p className="text-gray-500 mt-2">
                  Track temperature changes throughout the day and receive alerts for extreme conditions.
                </p>
              </div>

              {/* Humidity Feature */}
              <div className="farm-card p-6">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-farm-blue-100 text-farm-blue-600 mb-4">
                  <Droplet className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold text-farm-blue-900">Humidity Tracking</h3>
                <p className="text-gray-500 mt-2">
                  Monitor air moisture levels to prevent mold and optimize plant growth conditions.
                </p>
              </div>

              {/* Soil Moisture Feature */}
              <div className="farm-card p-6">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-farm-blue-100 text-farm-blue-600 mb-4">
                  <Plant className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold text-farm-blue-900">Soil Moisture Analysis</h3>
                <p className="text-gray-500 mt-2">
                  Keep track of soil moisture levels to optimize irrigation and prevent water waste.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-12 md:py-24 bg-farm-blue-50">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-farm-blue-900">
                  Ready to Optimize Your Farm?
                </h2>
                <p className="max-w-[600px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Join thousands of farmers who are already using Smart Farm to increase yields and reduce costs.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-3 pt-4">
                <Button size="lg" className="bg-farm-blue-600 hover:bg-farm-blue-700">
                  Get Started
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-farm-blue-600 text-farm-blue-600 hover:bg-farm-blue-50"
                >
                  Contact Sales
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t bg-white">
        <div className="container flex flex-col gap-4 py-10 md:flex-row md:gap-8 md:py-12">
          <div className="flex-1 space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-farm-blue-600 flex items-center justify-center">
                <Plant className="h-5 w-5 text-white" />
              </div>
              <span className="font-bold text-xl text-farm-blue-800">Smart Farm</span>
            </div>
            <p className="text-sm text-gray-500">Intelligent agriculture monitoring for the modern farmer.</p>
          </div>
          <div className="grid flex-1 grid-cols-2 gap-8 sm:grid-cols-3">
            <div className="space-y-3">
              <h3 className="text-sm font-medium">Product</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <a className="text-gray-500 hover:text-farm-blue-600" href="#">
                    Features
                  </a>
                </li>
                <li>
                  <a className="text-gray-500 hover:text-farm-blue-600" href="#">
                    Pricing
                  </a>
                </li>
                <li>
                  <a className="text-gray-500 hover:text-farm-blue-600" href="#">
                    Integrations
                  </a>
                </li>
              </ul>
            </div>
            <div className="space-y-3">
              <h3 className="text-sm font-medium">Company</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <a className="text-gray-500 hover:text-farm-blue-600" href="#">
                    About
                  </a>
                </li>
                <li>
                  <a className="text-gray-500 hover:text-farm-blue-600" href="#">
                    Blog
                  </a>
                </li>
                <li>
                  <a className="text-gray-500 hover:text-farm-blue-600" href="#">
                    Careers
                  </a>
                </li>
              </ul>
            </div>
            <div className="space-y-3">
              <h3 className="text-sm font-medium">Support</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <a className="text-gray-500 hover:text-farm-blue-600" href="#">
                    Help Center
                  </a>
                </li>
                <li>
                  <a className="text-gray-500 hover:text-farm-blue-600" href="#">
                    Contact
                  </a>
                </li>
                <li>
                  <a className="text-gray-500 hover:text-farm-blue-600" href="#">
                    Privacy
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="border-t py-6">
          <div className="container flex flex-col items-center justify-between gap-4 md:flex-row">
            <p className="text-xs text-gray-500">© 2025 Smart Farm. All rights reserved.</p>
            <div className="flex gap-4">
              <a href="#" className="text-gray-500 hover:text-farm-blue-600">
                Terms
              </a>
              <a href="#" className="text-gray-500 hover:text-farm-blue-600">
                Privacy
              </a>
              <a href="#" className="text-gray-500 hover:text-farm-blue-600">
                Cookies
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

