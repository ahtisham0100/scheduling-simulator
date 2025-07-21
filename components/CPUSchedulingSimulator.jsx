"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"
import { Button } from "./ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs"
import { useTheme } from "./ThemeProvider"
import Footer from "./Footer"

import ProcessInputForm from "./ProcessInputForm"
import GanttChart from "./GanttChart"
import MetricsTable from "./MetricsTable"
import AlgorithmComparison from "./AlgorithmComparison"

import {
  fcfsScheduling,
  sjfScheduling,
  priorityScheduling,
  roundRobinScheduling,
  calculateAverages,
} from "../utils/scheduling-algorithms"

const ALGORITHMS = {
  fcfs: { name: "First-Come First-Serve (FCFS)", description: "Processes are executed in the order they arrive" },
  sjf: { name: "Shortest Job First (SJF)", description: "Process with shortest burst time is executed first" },
  priority: { name: "Priority Scheduling", description: "Process with highest priority is executed first" },
  roundrobin: { name: "Round Robin", description: "Each process gets a fixed time quantum in circular order" },
}

export default function CPUSchedulingSimulator() {
  const [processes, setProcesses] = useState([])
  const [selectedAlgorithm, setSelectedAlgorithm] = useState("fcfs")
  const [timeQuantum, setTimeQuantum] = useState(2)
  const [simulationResult, setSimulationResult] = useState(null)
  const [comparisonData, setComparisonData] = useState([])
  const [isAnimated, setIsAnimated] = useState(false)
  const { theme, setTheme } = useTheme()

  // Debug log when algorithm changes
  useEffect(() => {
    console.log("Selected algorithm changed to:", selectedAlgorithm)
  }, [selectedAlgorithm])

  const runSimulation = () => {
    if (processes.length === 0) {
      alert("Please add at least one process")
      return
    }

    console.log("Running simulation with algorithm:", selectedAlgorithm)
    console.log("Processes:", processes)

    let result
    try {
      switch (selectedAlgorithm) {
        case "fcfs":
          result = fcfsScheduling(processes)
          break
        case "sjf":
          result = sjfScheduling(processes)
          break
        case "priority":
          result = priorityScheduling(processes)
          break
        case "roundrobin":
          result = roundRobinScheduling(processes, timeQuantum)
          break
        default:
          console.error("Unknown algorithm:", selectedAlgorithm)
          return
      }

      const averages = calculateAverages(result.processes)
      const simulationData = {
        ...result,
        averages,
        algorithm: selectedAlgorithm,
      }

      console.log("Simulation result:", simulationData)
      setSimulationResult(simulationData)
    } catch (error) {
      console.error("Error running simulation:", error)
      alert("Error running simulation. Please check your input data.")
    }
  }

  const runComparison = () => {
    if (processes.length === 0) {
      alert("Please add at least one process")
      return
    }

    const results = []

    // FCFS
    const fcfsResult = fcfsScheduling(processes)
    const fcfsAvg = calculateAverages(fcfsResult.processes)
    results.push({ algorithm: "FCFS", ...fcfsAvg })

    // SJF
    const sjfResult = sjfScheduling(processes)
    const sjfAvg = calculateAverages(sjfResult.processes)
    results.push({ algorithm: "SJF", ...sjfAvg })

    // Priority
    const priorityResult = priorityScheduling(processes)
    const priorityAvg = calculateAverages(priorityResult.processes)
    results.push({ algorithm: "Priority", ...priorityAvg })

    // Round Robin
    const rrResult = roundRobinScheduling(processes, timeQuantum)
    const rrAvg = calculateAverages(rrResult.processes)
    results.push({ algorithm: "Round Robin", ...rrAvg })

    setComparisonData(results)
  }

  const exportResults = () => {
    if (!simulationResult) {
      alert("No simulation results to export")
      return
    }

    const csvContent = [
      [
        "Process ID",
        "Arrival Time",
        "Burst Time",
        "Start Time",
        "End Time",
        "Waiting Time",
        "Turnaround Time",
        "Response Time",
      ],
      ...simulationResult.processes.map((p) => [
        p.id,
        p.arrivalTime,
        p.burstTime,
        p.startTime,
        p.endTime,
        p.waitingTime,
        p.turnaroundTime,
        p.responseTime,
      ]),
      [],
      ["Average Metrics"],
      ["Avg Waiting Time", simulationResult.averages.avgWaitingTime],
      ["Avg Turnaround Time", simulationResult.averages.avgTurnaroundTime],
      ["Avg Response Time", simulationResult.averages.avgResponseTime],
    ]
      .map((row) => row.join(","))
      .join("\n")

    const blob = new Blob([csvContent], { type: "text/csv" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `cpu-scheduling-${selectedAlgorithm}-results.csv`
    a.click()
    URL.revokeObjectURL(url)
  }

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light")
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4 dark:bg-gray-900 dark:text-gray-100">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-3xl">CPU Scheduling Simulator</CardTitle>
                <p className="text-gray-600 mt-2 dark:text-gray-400">
                  Interactive visualization of CPU scheduling algorithms
                </p>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" onClick={toggleTheme}>
                  {theme === "light" ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="w-4 h-4"
                    >
                      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
                    </svg>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="w-4 h-4"
                    >
                      <circle cx="12" cy="12" r="5"></circle>
                      <line x1="12" y1="1" x2="12" y2="3"></line>
                      <line x1="12" y1="21" x2="12" y2="23"></line>
                      <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
                      <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
                      <line x1="1" y1="12" x2="3" y2="12"></line>
                      <line x1="21" y1="12" x2="23" y2="12"></line>
                      <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
                      <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
                    </svg>
                  )}
                </Button>
              </div>
            </div>
          </CardHeader>
        </Card>

        {/* Algorithm Selection and Controls */}
        <Card>
          <CardHeader>
            <CardTitle>Algorithm Selection</CardTitle>
          </CardHeader>
          <CardContent>
            {/* Algorithm Radio Buttons */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4">
              {Object.entries(ALGORITHMS).map(([key, algo]) => (
                <div
                  key={key}
                  className={`flex items-center p-3 rounded-lg border cursor-pointer ${
                    selectedAlgorithm === key
                      ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20"
                      : "border-gray-200 dark:border-gray-700"
                  }`}
                  onClick={() => setSelectedAlgorithm(key)}
                >
                  <input
                    type="radio"
                    id={`algo-${key}`}
                    name="algorithm"
                    value={key}
                    checked={selectedAlgorithm === key}
                    onChange={() => setSelectedAlgorithm(key)}
                    className="mr-2"
                  />
                  <label htmlFor={`algo-${key}`} className="flex-1 cursor-pointer">
                    <div className="font-medium">{algo.name}</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">{algo.description}</div>
                  </label>
                </div>
              ))}
            </div>

            {/* Time Quantum for Round Robin */}
            {selectedAlgorithm === "roundrobin" && (
              <div className="mb-4 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <label htmlFor="timeQuantum" className="block mb-2 font-medium">
                  Time Quantum
                </label>
                <div className="flex items-center">
                  <input
                    id="timeQuantum"
                    type="number"
                    min="1"
                    value={timeQuantum}
                    onChange={(e) => setTimeQuantum(Number.parseInt(e.target.value) || 1)}
                    className="w-24 h-10 rounded-md border border-gray-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:border-gray-700 dark:bg-gray-800 dark:text-gray-50"
                  />
                  <span className="ml-2 text-gray-600 dark:text-gray-400">time units</span>
                </div>
              </div>
            )}

            <div className="flex flex-wrap gap-3">
              <Button onClick={runSimulation} className="flex items-center gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="w-4 h-4"
                >
                  <polygon points="5 3 19 12 5 21 5 3"></polygon>
                </svg>
                Run Simulation
              </Button>

              <Button variant="outline" onClick={() => setIsAnimated(!isAnimated)}>
                {isAnimated ? "Static View" : "Animated View"}
              </Button>

              {simulationResult && (
                <Button variant="outline" onClick={exportResults} className="flex items-center gap-2 bg-transparent">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="w-4 h-4"
                  >
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                    <polyline points="7 10 12 15 17 10"></polyline>
                    <line x1="12" y1="15" x2="12" y2="3"></line>
                  </svg>
                  Export CSV
                </Button>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Process Input */}
        <ProcessInputForm
          processes={processes}
          setProcesses={setProcesses}
          timeQuantum={timeQuantum}
          setTimeQuantum={setTimeQuantum}
          selectedAlgorithm={selectedAlgorithm}
        />

        {/* Results Tabs */}
        <Tabs defaultValue="gantt" className="space-y-4">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="gantt">Gantt Chart</TabsTrigger>
            <TabsTrigger value="metrics">Metrics</TabsTrigger>
            <TabsTrigger value="comparison">Comparison</TabsTrigger>
            <TabsTrigger value="help">Help</TabsTrigger>
          </TabsList>

          <TabsContent value="gantt">
            <GanttChart ganttData={simulationResult?.ganttChart || []} isAnimated={isAnimated} />
          </TabsContent>

          <TabsContent value="metrics">
            <MetricsTable processes={simulationResult?.processes || []} averages={simulationResult?.averages} />
          </TabsContent>

          <TabsContent value="comparison">
            <AlgorithmComparison comparisonData={comparisonData} onCompare={runComparison} />
          </TabsContent>

          <TabsContent value="help">
            <Card>
              <CardHeader>
                <CardTitle>How to Use the CPU Scheduling Simulator</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-semibold">1. Add Processes</h4>
                  <p className="text-gray-600 dark:text-gray-400">
                    Enter process details including ID, arrival time, burst time, and priority (if needed).
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold">2. Select Algorithm</h4>
                  <p className="text-gray-600 dark:text-gray-400">
                    Choose from FCFS, SJF, Priority, or Round Robin scheduling algorithms.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold">3. Run Simulation</h4>
                  <p className="text-gray-600 dark:text-gray-400">
                    Click "Run Simulation" to see the Gantt chart and performance metrics.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold">4. Compare Algorithms</h4>
                  <p className="text-gray-600 dark:text-gray-400">
                    Use the comparison tab to see how different algorithms perform with the same process set.
                  </p>
                </div>

                <div className="mt-6 p-4 bg-yellow-50 rounded-lg dark:bg-yellow-900/20">
                  <h4 className="font-semibold text-yellow-800 dark:text-yellow-300">Performance Metrics Explained:</h4>
                  <ul className="mt-2 space-y-1 text-sm text-yellow-700 dark:text-yellow-400">
                    <li>
                      <strong>Waiting Time:</strong> Time a process waits in the ready queue
                    </li>
                    <li>
                      <strong>Turnaround Time:</strong> Total time from arrival to completion
                    </li>
                    <li>
                      <strong>Response Time:</strong> Time from arrival to first execution
                    </li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
      <Footer />
    </div>
  )
}
