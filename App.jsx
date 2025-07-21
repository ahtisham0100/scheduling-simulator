import CPUSchedulingSimulator from "./components/CPUSchedulingSimulator"
import { ThemeProvider } from "./components/ThemeProvider"

function App() {
  return (
    <ThemeProvider defaultTheme="light" storageKey="cpu-simulator-theme">
      <CPUSchedulingSimulator />
    </ThemeProvider>
  )
}

export default App
