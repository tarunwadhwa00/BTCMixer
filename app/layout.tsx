import 'bootstrap/dist/css/bootstrap.min.css' // Import bootstrap CSS
import './globals.css'

import React from 'react'
import Script from 'next/script'
import { Inter } from 'next/font/google'
import { Metadata } from 'next'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Guacamole - Bitcoin Mixer',
  description: 'Guacamole is a mixer that uses smart technology to erase your crypto history and make your transactions 100% anonymous.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
      <Script src={'https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha3/dist/js/bootstrap.bundle.min.js'} strategy={'afterInteractive'} />
    </html>
  )
}
