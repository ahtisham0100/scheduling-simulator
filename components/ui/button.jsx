export function Button({ children, variant = "default", size = "default", className = "", ...props }) {
  const baseStyles =
    "inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50"

  const variants = {
    default: "bg-blue-600 text-white hover:bg-blue-700 focus-visible:ring-blue-500",
    outline: "border border-gray-300 bg-transparent hover:bg-gray-100 focus-visible:ring-gray-500",
    ghost: "bg-transparent hover:bg-gray-100 focus-visible:ring-gray-500",
  }

  const sizes = {
    default: "h-10 px-4 py-2",
    sm: "h-8 px-3 py-1 text-sm",
    lg: "h-12 px-6 py-3 text-lg",
  }

  const combinedClassName = `${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`

  return (
    <button className={combinedClassName} {...props}>
      {children}
    </button>
  )
}
