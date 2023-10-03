import './globals.css'
import type { Metadata } from 'next'
import IsAuth from '@/components/IsAuth'
import { Toaster } from 'react-hot-toast'
import { Analytics } from '@vercel/analytics/react'
import QueryProvider from '@/components/QueryProvider'

export const metadata: Metadata = {
  title: 'MemoMe',
  description: 'An Ultimate Anonymous Platform for Secure Communication, Polls, and Content Control.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="min-h-screen">
        <Toaster
          position="top-center"
          reverseOrder={false} />
        <Analytics />
        <QueryProvider>
          <IsAuth>
            {children}
          </IsAuth>
        </QueryProvider>
      </body>
    </html>
  )
}
