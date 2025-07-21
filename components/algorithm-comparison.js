"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"

export default function AlgorithmComparison({ comparisonData, onCompare }) {
  if (!comparisonData || comparisonData.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Algorithm Comparison</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center space-y-4">
            <p className="text-gray-500">Compare performance of different scheduling algorithms</p>
            <Button onClick={onCompare}>Run Comparison</Button>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Algorithm Performance Comparison</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={comparisonData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="algorithm" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="avgWaitingTime" fill="#3B82F6" name="Avg Waiting Time" />
              <Bar dataKey="avgTurnaroundTime" fill="#10B981" name="Avg Turnaround Time" />
              <Bar dataKey="avgResponseTime" fill="#8B5CF6" name="Avg Response Time" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="mt-4">
          <Button onClick={onCompare} variant="outline">
            Refresh Comparison
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
