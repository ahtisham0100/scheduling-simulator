"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Play, Pause, RotateCcw } from "lucide-react"

export default function GanttChart({ ganttData, isAnimated = false }) {
  const [currentTime, setCurrentTime] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [animationSpeed, setAnimationSpeed] = useState(500)

  const maxTime = ganttData.length > 0 ? Math.max(...ganttData.map((item) => item.endTime)) : 0
  const timeScale = maxTime > 0 ? 800 / maxTime : 1

  useEffect(() => {
    let interval
    if (isPlaying && isAnimated) {
      interval = setInterval(() => {
        setCurrentTime((prev) => {
          if (prev >= maxTime) {
            setIsPlaying(false)
            return maxTime
          }
          return prev + 0.1
        })
      }, animationSpeed / 10)
    }
    return () => clearInterval(interval)
  }, [isPlaying, isAnimated, maxTime, animationSpeed])

  const resetAnimation = () => {
    setCurrentTime(0)
    setIsPlaying(false)
  }

  const toggleAnimation = () => {
    if (currentTime >= maxTime) {
      resetAnimation()
    }
    setIsPlaying(!isPlaying)
  }

  const getVisibleGanttData = () => {
    if (!isAnimated) return ganttData
    return ganttData.filter((item) => item.startTime <= currentTime)
  }

  const getItemWidth = (item) => {
    if (!isAnimated) return (item.endTime - item.startTime) * timeScale
    const visibleEndTime = Math.min(item.endTime, currentTime)
    return Math.max(0, (visibleEndTime - item.startTime) * timeScale)
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Gantt Chart</CardTitle>
          {isAnimated && (
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={toggleAnimation}
                className="flex items-center gap-2 bg-transparent"
              >
                {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                {isPlaying ? "Pause" : "Play"}
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={resetAnimation}
                className="flex items-center gap-2 bg-transparent"
              >
                <RotateCcw className="w-4 h-4" />
                Reset
              </Button>
            </div>
          )}
        </div>
      </CardHeader>
      <CardContent>
        {ganttData.length === 0 ? (
          <div className="text-center text-gray-500 py-8">
            No scheduling data to display. Add processes and run simulation.
          </div>
        ) : (
          <div className="space-y-4">
            {/* Timeline */}
            <div className="relative">
              <div className="flex items-center h-12 bg-gray-100 rounded overflow-hidden">
                {getVisibleGanttData().map((item, index) => (
                  <div
                    key={`${item.processId}-${index}`}
                    className="h-full flex items-center justify-center text-white font-semibold text-sm border-r border-white transition-all duration-300"
                    style={{
                      backgroundColor: item.color,
                      width: `${getItemWidth(item)}px`,
                      minWidth: "2px",
                    }}
                  >
                    {getItemWidth(item) > 30 && item.processId}
                  </div>
                ))}
              </div>

              {/* Time markers */}
              <div className="flex justify-between mt-2 text-sm text-gray-600">
                {Array.from({ length: Math.ceil(maxTime) + 1 }, (_, i) => (
                  <span key={i} className="text-xs">
                    {i}
                  </span>
                ))}
              </div>
            </div>

            {/* Current time indicator for animation */}
            {isAnimated && <div className="text-sm text-gray-600">Current Time: {currentTime.toFixed(1)}</div>}

            {/* Process execution details */}
            <div className="space-y-2">
              <h4 className="font-semibold">Execution Order:</h4>
              <div className="flex flex-wrap gap-2">
                {ganttData.map((item, index) => (
                  <div
                    key={`${item.processId}-${index}`}
                    className="flex items-center gap-2 px-3 py-1 bg-gray-100 rounded text-sm"
                  >
                    <div className="w-3 h-3 rounded" style={{ backgroundColor: item.color }}></div>
                    <span className="font-mono">{item.processId}</span>
                    <span className="text-gray-600">
                      ({item.startTime}-{item.endTime})
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
