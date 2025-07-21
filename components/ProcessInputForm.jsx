"use client"

import { useState } from "react"
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { Label } from "./ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"

const PROCESS_COLORS = ["#3B82F6", "#EF4444", "#10B981", "#F59E0B", "#8B5CF6", "#EC4899", "#06B6D4", "#84CC16"]

export default function ProcessInputForm({ processes, setProcesses, selectedAlgorithm }) {
  const [newProcess, setNewProcess] = useState({
    id: "",
    arrivalTime: "",
    burstTime: "",
    priority: "",
  })

  const addProcess = () => {
    if (!newProcess.id || !newProcess.arrivalTime || !newProcess.burstTime) {
      alert("Please fill in all required fields")
      return
    }

    if (processes.some((p) => p.id === newProcess.id)) {
      alert("Process ID must be unique")
      return
    }

    const process = {
      id: newProcess.id,
      arrivalTime: Number.parseInt(newProcess.arrivalTime),
      burstTime: Number.parseInt(newProcess.burstTime),
      priority: selectedAlgorithm === "priority" ? Number.parseInt(newProcess.priority) : 0,
      color: PROCESS_COLORS[processes.length % PROCESS_COLORS.length],
    }

    setProcesses([...processes, process])
    setNewProcess({ id: "", arrivalTime: "", burstTime: "", priority: "" })
  }

  const removeProcess = (id) => {
    setProcesses(processes.filter((p) => p.id !== id))
  }

  const addSampleProcesses = () => {
    const sampleProcesses = [
      { id: "P1", arrivalTime: 0, burstTime: 8, priority: 2, color: PROCESS_COLORS[0] },
      { id: "P2", arrivalTime: 1, burstTime: 4, priority: 1, color: PROCESS_COLORS[1] },
      { id: "P3", arrivalTime: 2, burstTime: 9, priority: 3, color: PROCESS_COLORS[2] },
      { id: "P4", arrivalTime: 3, burstTime: 5, priority: 2, color: PROCESS_COLORS[3] },
    ]
    setProcesses(sampleProcesses)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Process Input</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Add New Process Form */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div>
            <Label htmlFor="processId">Process ID</Label>
            <Input
              id="processId"
              value={newProcess.id}
              onChange={(e) => setNewProcess({ ...newProcess, id: e.target.value })}
              placeholder="P1"
            />
          </div>
          <div>
            <Label htmlFor="arrivalTime">Arrival Time</Label>
            <Input
              id="arrivalTime"
              type="number"
              min="0"
              value={newProcess.arrivalTime}
              onChange={(e) => setNewProcess({ ...newProcess, arrivalTime: e.target.value })}
              placeholder="0"
            />
          </div>
          <div>
            <Label htmlFor="burstTime">Burst Time</Label>
            <Input
              id="burstTime"
              type="number"
              min="1"
              value={newProcess.burstTime}
              onChange={(e) => setNewProcess({ ...newProcess, burstTime: e.target.value })}
              placeholder="5"
            />
          </div>
          {selectedAlgorithm === "priority" && (
            <div>
              <Label htmlFor="priority">Priority</Label>
              <Input
                id="priority"
                type="number"
                min="1"
                value={newProcess.priority}
                onChange={(e) => setNewProcess({ ...newProcess, priority: e.target.value })}
                placeholder="1"
              />
            </div>
          )}
        </div>

        <div className="flex gap-2">
          <Button onClick={addProcess} className="flex items-center gap-2">
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
              <line x1="12" y1="5" x2="12" y2="19"></line>
              <line x1="5" y1="12" x2="19" y2="12"></line>
            </svg>
            Add Process
          </Button>
          <Button variant="outline" onClick={addSampleProcesses}>
            Load Sample Data
          </Button>
          <Button variant="outline" onClick={() => setProcesses([])}>
            Clear All
          </Button>
        </div>

        {/* Process List */}
        {processes.length > 0 && (
          <div>
            <h3 className="font-semibold mb-2">Current Processes:</h3>
            <div className="space-y-2">
              {processes.map((process) => (
                <div
                  key={process.id}
                  className="flex items-center justify-between p-2 bg-gray-50 rounded dark:bg-gray-700"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-4 h-4 rounded" style={{ backgroundColor: process.color }}></div>
                    <span className="font-mono">{process.id}</span>
                    <span>Arrival: {process.arrivalTime}</span>
                    <span>Burst: {process.burstTime}</span>
                    {selectedAlgorithm === "priority" && <span>Priority: {process.priority}</span>}
                  </div>
                  <Button variant="ghost" size="sm" onClick={() => removeProcess(process.id)}>
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
                      <polyline points="3 6 5 6 21 6"></polyline>
                      <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                      <line x1="10" y1="11" x2="10" y2="17"></line>
                      <line x1="14" y1="11" x2="14" y2="17"></line>
                    </svg>
                  </Button>
                </div>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
