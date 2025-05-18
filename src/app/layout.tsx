import type { Metadata } from "next"
import "./globals.css"
import { ThemeProvider } from "next-themes"

import { vazirmatn } from './fonts'
import { CookieProvider } from './providers/cookie-provider'
import ClientLayout from "./ClientLayout"
import AIAssistant from "../components/AIAssistant"

export const metadata: Metadata = {
    title: "ولت یار - نگهبان دارایی های بلاکچینی شما",
    description: "ارائه خدمات مشاوره بلاکچین با بالاترین استانداردها",
}

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    return (
        <html lang="fa" dir="rtl" suppressHydrationWarning>
            <body className={`${vazirmatn.className} min-h-screen bg-background text-foreground`}>
                <CookieProvider>
                    <ThemeProvider
                        attribute="class"
                        defaultTheme="dark"
                        enableSystem
                        disableTransitionOnChange
                    >
                        <ClientLayout>
                            {children}
                        </ClientLayout>
                    </ThemeProvider>
                </CookieProvider>
                <AIAssistant />
            </body>
        </html>
    )
}
