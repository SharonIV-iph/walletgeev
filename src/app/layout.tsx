import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "./providers/theme-provider"
import Navigation from "./components/Navigation"
import { vazirmatn } from './fonts'
import { CookieProvider } from './providers/cookie-provider'

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
            <Navigation />
            {children}
          </ThemeProvider>
        </CookieProvider>
      </body>
    </html>
  )
}
