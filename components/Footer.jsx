export default function Footer() {
  return (
    <footer className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 py-6 mt-8">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center">
          <p className="text-lg font-bold text-blue-600 dark:text-blue-400">Made by Ahtisham</p>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
            CPU Scheduling Simulator © {new Date().getFullYear()}
          </p>
        </div>
      </div>
    </footer>
  )
}
