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
import { ArrowDown, ArrowUp, TreesIcon as Plant, RefreshCcw } from "lucide-react"

// Mock data for the soil moisture page
const generateMockData = () => {
  const now = new Date()
  const data = []

  for (let i = 0; i < 24; i++) {
    const time = new Date(now)
    time.setHours(now.getHours() - 23 + i)

    data.push({
      time: time.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      soilMoisture: Math.round((40 + Math.sin(i / 5) * 10 + Math.random() * 3) * 10) / 10,
    })
  }

  return data
}

// Mock weekly data
const weeklyData = [
  { day: "Mon", min: 30, max: 50, avg: 40 },
  { day: "Tue", min: 32, max: 52, avg: 42 },
  { day: "Wed", min: 35, max: 55, avg: 45 },
  { day: "Thu", min: 33, max: 53, avg: 43 },
  { day: "Fri", min: 31, max: 51, avg: 41 },
  { day: "Sat", min: 30, max: 50, avg: 40 },
  { day: "Sun", min: 32, max: 52, avg: 42 },
]

// Mock monthly data
const monthlyData = [
  { name: "Week 1", min: 30, max: 55, avg: 42 },
  { name: "Week 2", min: 32, max: 57, avg: 44 },
  { name: "Week 3", min: 35, max: 60, avg: 47 },
  { name: "Week 4", min: 33, max: 58, avg: 45 },
]

export default function SoilMoisturePage() {
  const [data, setData] = useState(generateMockData())
  const [loading, setLoading] = useState(false)

  // Get the latest readings
  const latestData = data[data.length - 1]

  // Calculate changes from previous hour
  const previousHourData = data[data.length - 2]
  const soilMoistureChange = latestData.soilMoisture - previousHourData.soilMoisture

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
              <h1 className="text-3xl font-bold tracking-tight text-farm-blue-900">Soil Moisture Monitoring</h1>
              <p className="text-gray-500">Track soil moisture levels throughout your farm</p>
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
                <Plant className="mr-2 h-5 w-5 text-farm-blue-600" />
                Current Soil Moisture
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col md:flex-row items-center justify-between">
                <div className="text-5xl font-bold text-farm-blue-800">{latestData.soilMoisture}%</div>
                <div className="flex flex-col items-center mt-4 md:mt-0">
                  <div className="text-sm text-gray-500">Change from previous hour</div>
                  <div className="flex items-center mt-1">
                    {soilMoistureChange > 0 ? (
                      <ArrowUp className="mr-1 h-5 w-5 text-green-500" />
                    ) : (
                      <ArrowDown className="mr-1 h-5 w-5 text-red-500" />
                    )}
                    <span
                      className={`text-lg font-medium ${soilMoistureChange > 0 ? "text-green-500" : "text-red-500"}`}
                    >
                      {Math.abs(soilMoistureChange).toFixed(1)}%
                    </span>
                  </div>
                </div>
                <div className="flex flex-col items-center mt-4 md:mt-0">
                  <div className="text-sm text-gray-500">Status</div>
                  <div
                    className={`px-3 py-1 rounded-full text-white font-medium mt-1 ${
                      latestData.soilMoisture > 60
                        ? "bg-blue-500"
                        : latestData.soilMoisture < 20
                          ? "bg-red-500"
                          : "bg-green-500"
                    }`}
                  >
                    {latestData.soilMoisture > 60 ? "Too Wet" : latestData.soilMoisture < 20 ? "Too Dry" : "Optimal"}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* 24 Hour Chart */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>24 Hour Soil Moisture Trend</CardTitle>
              <CardDescription>Soil moisture readings over the last 24 hours</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={data}>
                    <defs>
                      <linearGradient id="soilMoistureGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#064e83" stopOpacity={0.8} />
                        <stop offset="95%" stopColor="#064e83" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="time" />
                    <YAxis domain={[0, 100]} />
                    <Tooltip />
                    <Area
                      type="monotone"
                      dataKey="soilMoisture"
                      stroke="#064e83"
                      fillOpacity={1}
                      fill="url(#soilMoistureGradient)"
                      name="Soil Moisture (%)"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Weekly Summary */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Weekly Soil Moisture Summary</CardTitle>
              <CardDescription>Min, max, and average soil moisture for the past week</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={weeklyData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="day" />
                    <YAxis domain={[0, 100]} />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="min" stroke="#064e83" name="Min Soil Moisture (%)" strokeWidth={2} />
                    <Line type="monotone" dataKey="avg" stroke="#0074c4" name="Avg Soil Moisture (%)" strokeWidth={2} />
                    <Line type="monotone" dataKey="max" stroke="#36adf6" name="Max Soil Moisture (%)" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Monthly Summary */}
          <Card>
            <CardHeader>
              <CardTitle>Monthly Soil Moisture Overview</CardTitle>
              <CardDescription>Soil moisture ranges by week for the current month</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={monthlyData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis domain={[0, 100]} />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="min" name="Min Soil Moisture (%)" fill="#064e83" />
                    <Bar dataKey="avg" name="Avg Soil Moisture (%)" fill="#0074c4" />
                    <Bar dataKey="max" name="Max Soil Moisture (%)" fill="#36adf6" />
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

