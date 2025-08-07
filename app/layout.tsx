import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
    title: 'SparkLab - 创意火花协作平台',
    description: '专为年轻人打造的轻量级创业合作平台',
    manifest: '/manifest.json',
    themeColor: '#8B5CF6',
}

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="zh-CN">
            <body className={inter.className}>
                <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50">
                    {children}
                </div>
            </body>
        </html>
    )
}