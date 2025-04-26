import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "next-themes"

import { vazirmatn } from './fonts'
import { CookieProvider } from './providers/cookie-provider'
import ClientLayout from "./ClientLayout"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "کلینیک تخصصی",
  description: "ارائه خدمات درمانی با بالاترین استانداردها",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="fa" dir="rtl" suppressHydrationWarning className={vazirmatn.variable}>
      <body className={`${inter.className} min-h-screen bg-background text-foreground font-sans ${vazirmatn.className}`}>
        <CookieProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <ClientLayout>

              {children}
            </ClientLayout>
          </ThemeProvider>
        </CookieProvider>
      </body>
    </html>
  )
}
