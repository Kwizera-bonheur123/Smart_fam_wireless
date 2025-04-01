"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Header } from "@/components/header"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
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
  BarChart,
  Bar,
  Legend,
} from "recharts"
import { AlertCircle, ArrowDown, ArrowUp, Droplet, TreesIcon as Plant, RefreshCcw, Thermometer } from "lucide-react"

// Mock data for the dashboard
const generateMockData = () => {
  const now = new Date()
  const data = []

  for (let i = 0; i < 24; i++) {
    const time = new Date(now)
    time.setHours(now.getHours() - 23 + i)

    data.push({
      time: time.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      temperature: Math.round((20 + Math.sin(i / 3) * 5 + Math.random() * 2) * 10) / 10,
      humidity: Math.round((60 + Math.sin(i / 4) * 15 + Math.random() * 5) * 10) / 10,
      soilMoisture: Math.round((40 + Math.sin(i / 5) * 10 + Math.random() * 3) * 10) / 10,
    })
  }

  return data
}

export default function DashboardPage() {
  const [data, setData] = useState(generateMockData())
  const [loading, setLoading] = useState(false)

  // Get the latest readings
  const latestData = data[data.length - 1]

  // Calculate changes from previous hour
  const previousHourData = data[data.length - 2]
  const temperatureChange = latestData.temperature - previousHourData.temperature
  const humidityChange = latestData.humidity - previousHourData.humidity
  const soilMoistureChange = latestData.soilMoisture - previousHourData.soilMoisture

  // Function to refresh data
  const refreshData = () => {
    setLoading(true)
    setTimeout(() => {
      setData(generateMockData())
      setLoading(false)
    }, 1000)
  }

  // Determine alert status
  const temperatureAlert = latestData.temperature > 30 || latestData.temperature < 10
  const humidityAlert = latestData.humidity < 30
  const soilMoistureAlert = latestData.soilMoisture < 20

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 py-8">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold tracking-tight text-farm-blue-900">Farm Dashboard</h1>
              <p className="text-gray-500">Monitor your farm's vital signs in real-time</p>
            </div>
            <Button onClick={refreshData} disabled={loading} className="mt-4 md:mt-0">
              <RefreshCcw className="mr-2 h-4 w-4" />
              {loading ? "Refreshing..." : "Refresh Data"}
            </Button>
          </div>

          {/* Current Readings */}
          <div className="grid gap-4 md:grid-cols-3 mb-8">
            {/* Temperature Card */}
            <Card className={temperatureAlert ? "border-red-400" : ""}>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium flex items-center">
                  <Thermometer className="mr-2 h-4 w-4 text-farm-blue-600" />
                  Temperature
                </CardTitle>
                <CardDescription>Current reading</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{latestData.temperature}°C</div>
                <div className="flex items-center mt-1 text-sm">
                  {temperatureChange > 0 ? (
                    <ArrowUp className="mr-1 h-4 w-4 text-red-500" />
                  ) : (
                    <ArrowDown className="mr-1 h-4 w-4 text-green-500" />
                  )}
                  <span className={temperatureChange > 0 ? "text-red-500" : "text-green-500"}>
                    {Math.abs(temperatureChange).toFixed(1)}°C from previous hour
                  </span>
                </div>
              </CardContent>
            </Card>

            {/* Humidity Card */}
            <Card className={humidityAlert ? "border-red-400" : ""}>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium flex items-center">
                  <Droplet className="mr-2 h-4 w-4 text-farm-blue-600" />
                  Humidity
                </CardTitle>
                <CardDescription>Current reading</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{latestData.humidity}%</div>
                <div className="flex items-center mt-1 text-sm">
                  {humidityChange > 0 ? (
                    <ArrowUp className="mr-1 h-4 w-4 text-green-500" />
                  ) : (
                    <ArrowDown className="mr-1 h-4 w-4 text-red-500" />
                  )}
                  <span className={humidityChange > 0 ? "text-green-500" : "text-red-500"}>
                    {Math.abs(humidityChange).toFixed(1)}% from previous hour
                  </span>
                </div>
              </CardContent>
            </Card>

            {/* Soil Moisture Card */}
            <Card className={soilMoistureAlert ? "border-red-400" : ""}>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium flex items-center">
                  <Plant className="mr-2 h-4 w-4 text-farm-blue-600" />
                  Soil Moisture
                </CardTitle>
                <CardDescription>Current reading</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{latestData.soilMoisture}%</div>
                <div className="flex items-center mt-1 text-sm">
                  {soilMoistureChange > 0 ? (
                    <ArrowUp className="mr-1 h-4 w-4 text-green-500" />
                  ) : (
                    <ArrowDown className="mr-1 h-4 w-4 text-red-500" />
                  )}
                  <span className={soilMoistureChange > 0 ? "text-green-500" : "text-red-500"}>
                    {Math.abs(soilMoistureChange).toFixed(1)}% from previous hour
                  </span>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Alerts Section */}
          {(temperatureAlert || humidityAlert || soilMoistureAlert) && (
            <div className="mb-8 space-y-4">
              <h2 className="text-xl font-bold text-farm-blue-900">Alerts</h2>
              {temperatureAlert && (
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertTitle>Temperature Alert</AlertTitle>
                  <AlertDescription>
                    Temperature is {latestData.temperature > 30 ? "too high" : "too low"} at {latestData.temperature}°C.
                    Optimal range is 10-30°C.
                  </AlertDescription>
                </Alert>
              )}
              {humidityAlert && (
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertTitle>Humidity Alert</AlertTitle>
                  <AlertDescription>
                    Humidity is too low at {latestData.humidity}%. Optimal range is above 30%.
                  </AlertDescription>
                </Alert>
              )}
              {soilMoistureAlert && (
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertTitle>Soil Moisture Alert</AlertTitle>
                  <AlertDescription>
                    Soil moisture is too low at {latestData.soilMoisture}%. Plants may need watering.
                  </AlertDescription>
                </Alert>
              )}
            </div>
          )}

          {/* Charts Section */}
          <Tabs defaultValue="temperature" className="mb-8">
            <TabsList className="mb-4">
              <TabsTrigger value="temperature">Temperature</TabsTrigger>
              <TabsTrigger value="humidity">Humidity</TabsTrigger>
              <TabsTrigger value="soil-moisture">Soil Moisture</TabsTrigger>
              <TabsTrigger value="all">All Metrics</TabsTrigger>
            </TabsList>

            <TabsContent value="temperature">
              <Card>
                <CardHeader>
                  <CardTitle>Temperature Trends (24 Hours)</CardTitle>
                  <CardDescription>Measured in degrees Celsius (°C)</CardDescription>
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
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="humidity">
              <Card>
                <CardHeader>
                  <CardTitle>Humidity Trends (24 Hours)</CardTitle>
                  <CardDescription>Measured in percentage (%)</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={data}>
                        <defs>
                          <linearGradient id="humidityGradient" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#36adf6" stopOpacity={0.8} />
                            <stop offset="95%" stopColor="#36adf6" stopOpacity={0} />
                          </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="time" />
                        <YAxis domain={[0, 100]} />
                        <Tooltip />
                        <Area
                          type="monotone"
                          dataKey="humidity"
                          stroke="#36adf6"
                          fillOpacity={1}
                          fill="url(#humidityGradient)"
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="soil-moisture">
              <Card>
                <CardHeader>
                  <CardTitle>Soil Moisture Trends (24 Hours)</CardTitle>
                  <CardDescription>Measured in percentage (%)</CardDescription>
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
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="all">
              <Card>
                <CardHeader>
                  <CardTitle>All Metrics (24 Hours)</CardTitle>
                  <CardDescription>Combined view of temperature, humidity, and soil moisture</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={data}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="time" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Line
                          type="monotone"
                          dataKey="temperature"
                          stroke="#0074c4"
                          name="Temperature (°C)"
                          strokeWidth={2}
                        />
                        <Line type="monotone" dataKey="humidity" stroke="#36adf6" name="Humidity (%)" strokeWidth={2} />
                        <Line
                          type="monotone"
                          dataKey="soilMoisture"
                          stroke="#064e83"
                          name="Soil Moisture (%)"
                          strokeWidth={2}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          {/* Weekly Summary */}
          <div className="mb-8">
            <h2 className="text-xl font-bold text-farm-blue-900 mb-4">Weekly Summary</h2>
            <Card>
              <CardHeader>
                <CardTitle>Average Readings (Last 7 Days)</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={[
                        { name: "Mon", temperature: 22, humidity: 65, soilMoisture: 45 },
                        { name: "Tue", temperature: 21, humidity: 62, soilMoisture: 42 },
                        { name: "Wed", temperature: 23, humidity: 58, soilMoisture: 40 },
                        { name: "Thu", temperature: 25, humidity: 55, soilMoisture: 38 },
                        { name: "Fri", temperature: 24, humidity: 60, soilMoisture: 41 },
                        { name: "Sat", temperature: 22, humidity: 63, soilMoisture: 43 },
                        { name: "Sun", temperature: 23, humidity: 67, soilMoisture: 44 },
                      ]}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="temperature" name="Temperature (°C)" fill="#0074c4" />
                      <Bar dataKey="humidity" name="Humidity (%)" fill="#36adf6" />
                      <Bar dataKey="soilMoisture" name="Soil Moisture (%)" fill="#064e83" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>
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

