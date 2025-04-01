"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Header } from "@/components/header"
import { Button } from "@/components/ui/button"
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  Legend,
  BarChart,
  Bar,
} from "recharts"
import { ArrowDown, ArrowUp, RefreshCcw, Thermometer } from "lucide-react"

// Mock data for the temperature page
const generateMockData = () => {
  const now = new Date()
  const data = []

  for (let i = 0; i < 24; i++) {
    const time = new Date(now)
    time.setHours(now.getHours() - 23 + i)

    data.push({
      time: time.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      temperature: Math.round((20 + Math.sin(i / 3) * 5 + Math.random() * 2) * 10) / 10,
    })
  }

  return data
}

// Mock weekly data
const weeklyData = [
  { day: "Mon", min: 18, max: 25, avg: 21.5 },
  { day: "Tue", min: 17, max: 24, avg: 20.5 },
  { day: "Wed", min: 19, max: 26, avg: 22.5 },
  { day: "Thu", min: 20, max: 28, avg: 24 },
  { day: "Fri", min: 19, max: 27, avg: 23 },
  { day: "Sat", min: 18, max: 25, avg: 21.5 },
  { day: "Sun", min: 19, max: 26, avg: 22.5 },
]

// Mock monthly data
const monthlyData = [
  { name: "Week 1", min: 17, max: 26, avg: 21.5 },
  { name: "Week 2", min: 18, max: 27, avg: 22.5 },
  { name: "Week 3", min: 19, max: 28, avg: 23.5 },
  { name: "Week 4", min: 18, max: 26, avg: 22 },
]

export default function TemperaturePage() {
  const [data, setData] = useState(generateMockData())
  const [loading, setLoading] = useState(false)

  // Get the latest readings
  const latestData = data[data.length - 1]

  // Calculate changes from previous hour
  const previousHourData = data[data.length - 2]
  const temperatureChange = latestData.temperature - previousHourData.temperature

  // Function to refresh data
  const refreshData = () => {
    setLoading(true)
    setTimeout(() => {
      setData(generateMockData())
      setLoading(false)
    }, 1000)
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 py-8">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold tracking-tight text-farm-blue-900">Temperature Monitoring</h1>
              <p className="text-gray-500">Track temperature changes throughout your farm</p>
            </div>
            <Button onClick={refreshData} disabled={loading} className="mt-4 md:mt-0">
              <RefreshCcw className="mr-2 h-4 w-4" />
              {loading ? "Refreshing..." : "Refresh Data"}
            </Button>
          </div>

          {/* Current Reading */}
          <Card className="mb-8">
            <CardHeader className="pb-2">
              <CardTitle className="text-xl font-medium flex items-center">
                <Thermometer className="mr-2 h-5 w-5 text-farm-blue-600" />
                Current Temperature
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col md:flex-row items-center justify-between">
                <div className="text-5xl font-bold text-farm-blue-800">{latestData.temperature}°C</div>
                <div className="flex flex-col items-center mt-4 md:mt-0">
                  <div className="text-sm text-gray-500">Change from previous hour</div>
                  <div className="flex items-center mt-1">
                    {temperatureChange > 0 ? (
                      <ArrowUp className="mr-1 h-5 w-5 text-red-500" />
                    ) : (
                      <ArrowDown className="mr-1 h-5 w-5 text-green-500" />
                    )}
                    <span
                      className={`text-lg font-medium ${temperatureChange > 0 ? "text-red-500" : "text-green-500"}`}
                    >
                      {Math.abs(temperatureChange).toFixed(1)}°C
                    </span>
                  </div>
                </div>
                <div className="flex flex-col items-center mt-4 md:mt-0">
                  <div className="text-sm text-gray-500">Status</div>
                  <div
                    className={`px-3 py-1 rounded-full text-white font-medium mt-1 ${
                      latestData.temperature > 30
                        ? "bg-red-500"
                        : latestData.temperature < 10
                          ? "bg-blue-500"
                          : "bg-green-500"
                    }`}
                  >
                    {latestData.temperature > 30 ? "Too Hot" : latestData.temperature < 10 ? "Too Cold" : "Optimal"}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* 24 Hour Chart */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>24 Hour Temperature Trend</CardTitle>
              <CardDescription>Temperature readings over the last 24 hours</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={data}>
                    <defs>
                      <linearGradient id="temperatureGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#0074c4" stopOpacity={0.8} />
                        <stop offset="95%" stopColor="#0074c4" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="time" />
                    <YAxis domain={[0, 40]} />
                    <Tooltip />
                    <Area
                      type="monotone"
                      dataKey="temperature"
                      stroke="#0074c4"
                      fillOpacity={1}
                      fill="url(#temperatureGradient)"
                      name="Temperature (°C)"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Weekly Summary */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Weekly Temperature Summary</CardTitle>
              <CardDescription>Min, max, and average temperatures for the past week</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={weeklyData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="day" />
                    <YAxis domain={[0, 40]} />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="min" stroke="#064e83" name="Min Temp (°C)" strokeWidth={2} />
                    <Line type="monotone" dataKey="avg" stroke="#0074c4" name="Avg Temp (°C)" strokeWidth={2} />
                    <Line type="monotone" dataKey="max" stroke="#36adf6" name="Max Temp (°C)" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Monthly Summary */}
          <Card>
            <CardHeader>
              <CardTitle>Monthly Temperature Overview</CardTitle>
              <CardDescription>Temperature ranges by week for the current month</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={monthlyData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis domain={[0, 40]} />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="min" name="Min Temp (°C)" fill="#064e83" />
                    <Bar dataKey="avg" name="Avg Temp (°C)" fill="#0074c4" />
                    <Bar dataKey="max" name="Max Temp (°C)" fill="#36adf6" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t bg-white py-6">
        <div className="container px-4 md:px-6">
          <p className="text-center text-sm text-gray-500">© 2025 Smart Farm. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}

