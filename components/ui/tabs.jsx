"use client"

import React, { useState } from "react"

export function Tabs({ children, defaultValue, className = "", ...props }) {
  const [activeTab, setActiveTab] = useState(defaultValue)

  // Clone children with additional props
  const enhancedChildren = React.Children.map(children, (child) => {
    if (child.type === TabsList || child.type === TabsContent) {
      return React.cloneElement(child, {
        activeTab,
        setActiveTab,
      })
    }
    return child
  })

  return (
    <div className={className} {...props}>
      {enhancedChildren}
    </div>
  )
}

export function TabsList({ children, activeTab, setActiveTab, className = "", ...props }) {
  // Clone children with additional props
  const enhancedChildren = React.Children.map(children, (child) => {
    if (child.type === TabsTrigger) {
      return React.cloneElement(child, {
        isActive: activeTab === child.props.value,
        onClick: () => setActiveTab(child.props.value),
      })
    }
    return child
  })

  return (
    <div
      className={`inline-flex h-10 items-center justify-center rounded-md bg-gray-100 p-1 dark:bg-gray-800 ${className}`}
      {...props}
    >
      {enhancedChildren}
    </div>
  )
}

export function TabsTrigger({ children, value, isActive, onClick, className = "", ...props }) {
  return (
    <button
      className={`inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 disabled:pointer-events-none disabled:opacity-50 ${
        isActive
          ? "bg-white text-gray-900 shadow-sm dark:bg-gray-700 dark:text-gray-100"
          : "text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100"
      } ${className}`}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  )
}

export function TabsContent({ children, value, activeTab, className = "", ...props }) {
  if (value !== activeTab) return null

  return (
    <div
      className={`mt-2 ring-offset-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 dark:ring-offset-gray-900 ${className}`}
      {...props}
    >
      {children}
    </div>
  )
}
