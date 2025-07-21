export function Card({ children, className = "", ...props }) {
  return (
    <div
      className={`bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm ${className}`}
      {...props}
    >
      {children}
    </div>
  )
}

export function CardHeader({ children, className = "", ...props }) {
  return (
    <div className={`p-6 border-b border-gray-200 dark:border-gray-700 ${className}`} {...props}>
      {children}
    </div>
  )
}

export function CardTitle({ children, className = "", ...props }) {
  return (
    <h3 className={`text-xl font-semibold text-gray-900 dark:text-gray-100 ${className}`} {...props}>
      {children}
    </h3>
  )
}

export function CardContent({ children, className = "", ...props }) {
  return (
    <div className={`p-6 ${className}`} {...props}>
      {children}
    </div>
  )
}
