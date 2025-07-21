"use client"
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"
import { Button } from "./ui/button"

export default function AlgorithmComparison({ comparisonData, onCompare }) {
  if (!comparisonData || comparisonData.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Algorithm Comparison</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center space-y-4">
            <p className="text-gray-500 dark:text-gray-400">Compare performance of different scheduling algorithms</p>
            <Button onClick={onCompare}>Run Comparison</Button>
          </div>
        </CardContent>
      </Card>
    )
  }

  // Simple bar chart implementation
  const maxValue = Math.max(
    ...comparisonData.flatMap((item) => [item.avgWaitingTime, item.avgTurnaroundTime, item.avgResponseTime]),
  )

  return (
    <Card>
      <CardHeader>
        <CardTitle>Algorithm Performance Comparison</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {/* Simple bar chart */}
          <div className="space-y-4">
            <div className="space-y-2">
              <h4 className="font-semibold">Average Waiting Time</h4>
              {comparisonData.map((item, index) => (
                <div key={`wait-${index}`} className="flex items-center gap-2">
                  <div className="w-24 text-sm">{item.algorithm}</div>
                  <div className="flex-1 h-6 bg-gray-100 rounded-full overflow-hidden dark:bg-gray-700">
                    <div
                      className="h-full bg-blue-500"
                      style={{ width: `${(item.avgWaitingTime / maxValue) * 100}%` }}
                    ></div>
                  </div>
                  <div className="w-12 text-right text-sm">{item.avgWaitingTime}</div>
                </div>
              ))}
            </div>

            <div className="space-y-2">
              <h4 className="font-semibold">Average Turnaround Time</h4>
              {comparisonData.map((item, index) => (
                <div key={`turn-${index}`} className="flex items-center gap-2">
                  <div className="w-24 text-sm">{item.algorithm}</div>
                  <div className="flex-1 h-6 bg-gray-100 rounded-full overflow-hidden dark:bg-gray-700">
                    <div
                      className="h-full bg-green-500"
                      style={{ width: `${(item.avgTurnaroundTime / maxValue) * 100}%` }}
                    ></div>
                  </div>
                  <div className="w-12 text-right text-sm">{item.avgTurnaroundTime}</div>
                </div>
              ))}
            </div>

            <div className="space-y-2">
              <h4 className="font-semibold">Average Response Time</h4>
              {comparisonData.map((item, index) => (
                <div key={`resp-${index}`} className="flex items-center gap-2">
                  <div className="w-24 text-sm">{item.algorithm}</div>
                  <div className="flex-1 h-6 bg-gray-100 rounded-full overflow-hidden dark:bg-gray-700">
                    <div
                      className="h-full bg-purple-500"
                      style={{ width: `${(item.avgResponseTime / maxValue) * 100}%` }}
                    ></div>
                  </div>
                  <div className="w-12 text-right text-sm">{item.avgResponseTime}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-4">
            <Button onClick={onCompare} variant="outline">
              Refresh Comparison
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
