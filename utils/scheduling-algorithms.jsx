// First-Come First-Serve (FCFS) Algorithm
export function fcfsScheduling(processes) {
  const result = []
  const ganttChart = []
  let currentTime = 0

  // Sort by arrival time
  const sortedProcesses = [...processes].sort((a, b) => a.arrivalTime - b.arrivalTime)

  sortedProcesses.forEach((process) => {
    const startTime = Math.max(currentTime, process.arrivalTime)
    const endTime = startTime + process.burstTime

    ganttChart.push({
      processId: process.id,
      startTime,
      endTime,
      color: process.color,
    })

    result.push({
      ...process,
      startTime,
      endTime,
      waitingTime: startTime - process.arrivalTime,
      turnaroundTime: endTime - process.arrivalTime,
      responseTime: startTime - process.arrivalTime,
    })

    currentTime = endTime
  })

  return { processes: result, ganttChart }
}

// Shortest Job First (SJF) Algorithm
export function sjfScheduling(processes) {
  const result = []
  const ganttChart = []
  const readyQueue = []
  let currentTime = 0
  const remainingProcesses = [...processes].sort((a, b) => a.arrivalTime - b.arrivalTime)

  while (remainingProcesses.length > 0 || readyQueue.length > 0) {
    // Add arrived processes to ready queue
    while (remainingProcesses.length > 0 && remainingProcesses[0].arrivalTime <= currentTime) {
      readyQueue.push(remainingProcesses.shift())
    }

    if (readyQueue.length === 0) {
      currentTime = remainingProcesses[0].arrivalTime
      continue
    }

    // Select shortest job
    readyQueue.sort((a, b) => a.burstTime - b.burstTime)
    const currentProcess = readyQueue.shift()

    const startTime = currentTime
    const endTime = startTime + currentProcess.burstTime

    ganttChart.push({
      processId: currentProcess.id,
      startTime,
      endTime,
      color: currentProcess.color,
    })

    result.push({
      ...currentProcess,
      startTime,
      endTime,
      waitingTime: startTime - currentProcess.arrivalTime,
      turnaroundTime: endTime - currentProcess.arrivalTime,
      responseTime: startTime - currentProcess.arrivalTime,
    })

    currentTime = endTime
  }

  return { processes: result, ganttChart }
}

// Priority Scheduling Algorithm
export function priorityScheduling(processes) {
  const result = []
  const ganttChart = []
  const readyQueue = []
  let currentTime = 0
  const remainingProcesses = [...processes].sort((a, b) => a.arrivalTime - b.arrivalTime)

  while (remainingProcesses.length > 0 || readyQueue.length > 0) {
    // Add arrived processes to ready queue
    while (remainingProcesses.length > 0 && remainingProcesses[0].arrivalTime <= currentTime) {
      readyQueue.push(remainingProcesses.shift())
    }

    if (readyQueue.length === 0) {
      currentTime = remainingProcesses[0].arrivalTime
      continue
    }

    // Select highest priority (lower number = higher priority)
    readyQueue.sort((a, b) => a.priority - b.priority)
    const currentProcess = readyQueue.shift()

    const startTime = currentTime
    const endTime = startTime + currentProcess.burstTime

    ganttChart.push({
      processId: currentProcess.id,
      startTime,
      endTime,
      color: currentProcess.color,
    })

    result.push({
      ...currentProcess,
      startTime,
      endTime,
      waitingTime: startTime - currentProcess.arrivalTime,
      turnaroundTime: endTime - currentProcess.arrivalTime,
      responseTime: startTime - currentProcess.arrivalTime,
    })

    currentTime = endTime
  }

  return { processes: result, ganttChart }
}

// Round Robin Algorithm
export function roundRobinScheduling(processes, timeQuantum) {
  const result = []
  const ganttChart = []
  const readyQueue = []
  let currentTime = 0
  const remainingProcesses = [...processes].map((p) => ({ ...p, remainingTime: p.burstTime, hasStarted: false }))
  remainingProcesses.sort((a, b) => a.arrivalTime - b.arrivalTime)

  while (remainingProcesses.some((p) => p.remainingTime > 0) || readyQueue.length > 0) {
    // Add arrived processes to ready queue
    while (remainingProcesses.length > 0 && remainingProcesses[0].arrivalTime <= currentTime) {
      const process = remainingProcesses.shift()
      if (process.remainingTime > 0) {
        readyQueue.push(process)
      }
    }

    if (readyQueue.length === 0) {
      if (remainingProcesses.length > 0) {
        currentTime = remainingProcesses[0].arrivalTime
      }
      continue
    }

    const currentProcess = readyQueue.shift()
    const startTime = currentTime
    const executionTime = Math.min(timeQuantum, currentProcess.remainingTime)
    const endTime = startTime + executionTime

    // Record response time on first execution
    if (!currentProcess.hasStarted) {
      currentProcess.responseTime = startTime - currentProcess.arrivalTime
      currentProcess.hasStarted = true
    }

    ganttChart.push({
      processId: currentProcess.id,
      startTime,
      endTime,
      color: currentProcess.color,
    })

    currentProcess.remainingTime -= executionTime
    currentTime = endTime

    // Add newly arrived processes
    while (remainingProcesses.length > 0 && remainingProcesses[0].arrivalTime <= currentTime) {
      const process = remainingProcesses.shift()
      if (process.remainingTime > 0) {
        readyQueue.push(process)
      }
    }

    // If process not finished, add back to queue
    if (currentProcess.remainingTime > 0) {
      readyQueue.push(currentProcess)
    } else {
      // Process completed
      result.push({
        ...currentProcess,
        endTime,
        waitingTime: endTime - currentProcess.arrivalTime - currentProcess.burstTime,
        turnaroundTime: endTime - currentProcess.arrivalTime,
        responseTime: currentProcess.responseTime,
      })
    }
  }

  return { processes: result, ganttChart }
}

// Calculate average metrics
export function calculateAverages(processes) {
  const totalProcesses = processes.length
  const avgWaitingTime = processes.reduce((sum, p) => sum + p.waitingTime, 0) / totalProcesses
  const avgTurnaroundTime = processes.reduce((sum, p) => sum + p.turnaroundTime, 0) / totalProcesses
  const avgResponseTime = processes.reduce((sum, p) => sum + p.responseTime, 0) / totalProcesses

  return {
    avgWaitingTime: Math.round(avgWaitingTime * 100) / 100,
    avgTurnaroundTime: Math.round(avgTurnaroundTime * 100) / 100,
    avgResponseTime: Math.round(avgResponseTime * 100) / 100,
  }
}
