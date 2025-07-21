import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"

export default function MetricsTable({ processes, averages }) {
  if (!processes || processes.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Performance Metrics</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center text-gray-500 py-8 dark:text-gray-400">
            No metrics to display. Run simulation first.
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Performance Metrics</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b dark:border-gray-700">
                <th className="text-left p-2 font-semibold">Process</th>
                <th className="text-left p-2 font-semibold">Arrival Time</th>
                <th className="text-left p-2 font-semibold">Burst Time</th>
                <th className="text-left p-2 font-semibold">Start Time</th>
                <th className="text-left p-2 font-semibold">End Time</th>
                <th className="text-left p-2 font-semibold">Waiting Time</th>
                <th className="text-left p-2 font-semibold">Turnaround Time</th>
                <th className="text-left p-2 font-semibold">Response Time</th>
              </tr>
            </thead>
            <tbody>
              {processes.map((process) => (
                <tr key={process.id} className="border-b hover:bg-gray-50 dark:border-gray-700 dark:hover:bg-gray-800">
                  <td className="p-2">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded" style={{ backgroundColor: process.color }}></div>
                      <span className="font-mono">{process.id}</span>
                    </div>
                  </td>
                  <td className="p-2">{process.arrivalTime}</td>
                  <td className="p-2">{process.burstTime}</td>
                  <td className="p-2">{process.startTime}</td>
                  <td className="p-2">{process.endTime}</td>
                  <td className="p-2">{process.waitingTime}</td>
                  <td className="p-2">{process.turnaroundTime}</td>
                  <td className="p-2">{process.responseTime}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Average metrics */}
        {averages && (
          <div className="mt-6 p-4 bg-blue-50 rounded-lg dark:bg-blue-900/20">
            <h4 className="font-semibold mb-2">Average Performance:</h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">{averages.avgWaitingTime}</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Avg Waiting Time</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                  {averages.avgTurnaroundTime}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Avg Turnaround Time</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                  {averages.avgResponseTime}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Avg Response Time</div>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
