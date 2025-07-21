import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'cpu sceduling simulator',
  description: 'developed by Ahtisham',
  generator: 'Ahtisham',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
