"use client"

import React, { useState, useRef, useEffect } from "react"

export function Select({ children, value, onValueChange, className = "", ...props }) {
  const [isOpen, setIsOpen] = useState(false)
  const ref = useRef(null)

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        setIsOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [ref])

  // Extract SelectItem children to get options
  const options = React.Children.toArray(children).filter((child) => child.type === SelectItem)
  const selectedOption = options.find((option) => option.props.value === value)

  return (
    <div ref={ref} className={`relative ${className}`} {...props}>
      <button
        type="button"
        className={`flex h-10 w-full items-center justify-between rounded-md border border-gray-300 bg-white px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-50 dark:focus:ring-blue-400 ${isOpen ? "ring-2 ring-blue-500 border-transparent" : ""}`}
        onClick={() => setIsOpen(!isOpen)}
      >
        <span>{selectedOption ? selectedOption.props.children : "Select..."}</span>
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
          className={`h-4 w-4 transition-transform ${isOpen ? "rotate-180" : ""}`}
        >
          <polyline points="6 9 12 15 18 9"></polyline>
        </svg>
      </button>

      {isOpen && (
        <div className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none dark:bg-gray-800 dark:ring-gray-700">
          {options.map((option, index) => (
            <div
              key={index}
              className={`relative cursor-pointer select-none py-2 pl-3 pr-9 text-gray-900 hover:bg-blue-100 dark:text-gray-100 dark:hover:bg-gray-700 ${option.props.value === value ? "bg-blue-50 dark:bg-gray-700" : ""}`}
              onClick={() => {
                onValueChange(option.props.value)
                setIsOpen(false)
              }}
            >
              <span className="block truncate">{option.props.children}</span>
              {option.props.value === value && (
                <span className="absolute inset-y-0 right-0 flex items-center pr-4 text-blue-600 dark:text-blue-400">
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
                    className="h-5 w-5"
                  >
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                </span>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export function SelectTrigger({ children, ...props }) {
  return <div {...props}>{children}</div>
}

export function SelectValue({ children }) {
  return <span>{children}</span>
}

export function SelectContent({ children }) {
  return <div>{children}</div>
}

export function SelectItem({ children, value, ...props }) {
  return (
    <div data-value={value} {...props}>
      {children}
    </div>
  )
}
