"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Play, Download, Info } from "lucide-react"

import ProcessInputForm from "../components/process-input-form"
import GanttChart from "../components/gantt-chart"
import MetricsTable from "../components/metrics-table"
import AlgorithmComparison from "../components/algorithm-comparison"

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

  const runSimulation = () => {
    if (processes.length === 0) {
      alert("Please add at least one process")
      return
    }

    let result
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
        return
    }

    const averages = calculateAverages(result.processes)
    setSimulationResult({
      ...result,
      averages,
      algorithm: selectedAlgorithm,
    })
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

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-3xl">CPU Scheduling Simulator</CardTitle>
                <p className="text-gray-600 mt-2">Interactive visualization of CPU scheduling algorithms</p>
              </div>
              <Badge variant="secondary" className="text-lg px-4 py-2">
                Educational Tool
              </Badge>
            </div>
          </CardHeader>
        </Card>

        {/* Algorithm Selection and Controls */}
        <Card>
          <CardHeader>
            <CardTitle>Algorithm Selection</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap items-center gap-4">
              <div className="flex-1 min-w-64">
                <Select value={selectedAlgorithm} onValueChange={setSelectedAlgorithm}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.entries(ALGORITHMS).map(([key, algo]) => (
                      <SelectItem key={key} value={key}>
                        {algo.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="flex gap-2">
                <Button onClick={runSimulation} className="flex items-center gap-2">
                  <Play className="w-4 h-4" />
                  Run Simulation
                </Button>

                <Button variant="outline" onClick={() => setIsAnimated(!isAnimated)}>
                  {isAnimated ? "Static View" : "Animated View"}
                </Button>

                {simulationResult && (
                  <Button variant="outline" onClick={exportResults} className="flex items-center gap-2 bg-transparent">
                    <Download className="w-4 h-4" />
                    Export CSV
                  </Button>
                )}
              </div>
            </div>

            {/* Algorithm Description */}
            <div className="mt-4 p-3 bg-blue-50 rounded-lg flex items-start gap-2">
              <Info className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
              <div>
                <p className="font-medium text-blue-900">{ALGORITHMS[selectedAlgorithm].name}</p>
                <p className="text-blue-700 text-sm">{ALGORITHMS[selectedAlgorithm].description}</p>
              </div>
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
                  <p className="text-gray-600">
                    Enter process details including ID, arrival time, burst time, and priority (if needed).
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold">2. Select Algorithm</h4>
                  <p className="text-gray-600">
                    Choose from FCFS, SJF, Priority, or Round Robin scheduling algorithms.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold">3. Run Simulation</h4>
                  <p className="text-gray-600">
                    Click "Run Simulation" to see the Gantt chart and performance metrics.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold">4. Compare Algorithms</h4>
                  <p className="text-gray-600">
                    Use the comparison tab to see how different algorithms perform with the same process set.
                  </p>
                </div>

                <div className="mt-6 p-4 bg-yellow-50 rounded-lg">
                  <h4 className="font-semibold text-yellow-800">Performance Metrics Explained:</h4>
                  <ul className="mt-2 space-y-1 text-sm text-yellow-700">
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
    </div>
  )
}
