import './globals.css'
import type { Metadata } from 'next'
import { Toaster } from 'react-hot-toast'
import QueryProvider from '@/components/QueryProvider'

export const metadata: Metadata = {
  title: 'MemoMe',
  description: '...',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <Toaster
          position="top-center"
          reverseOrder={false} />
        <QueryProvider>
          {children}
        </QueryProvider>
      </body>
    </html>
  )
}
