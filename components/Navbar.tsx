'use client'

import { useState } from 'react'
import { Menu, X, Zap, Users, Briefcase, User } from 'lucide-react'

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false)

    return (
        <nav className="bg-white/80 backdrop-blur-md border-b border-white/20 sticky top-0 z-50">
            <div className="container mx-auto px-4">
                <div className="flex justify-between items-center h-16">
                    {/* Logo */}
                    <div className="flex items-center space-x-2">
                        <div className="w-8 h-8 spark-gradient rounded-lg flex items-center justify-center">
                            <Zap className="w-5 h-5 text-white" />
                        </div>
                        <span className="text-xl font-bold bg-gradient-to-r from-spark-purple to-spark-pink bg-clip-text text-transparent">
                            SparkLab
                        </span>
                    </div>

                    {/* Desktop Menu */}
                    <div className="hidden md:flex items-center space-x-8">
                        <a href="#" className="flex items-center space-x-1 text-gray-700 hover:text-spark-purple transition-colors">
                            <Zap className="w-4 h-4" />
                            <span>火花广场</span>
                        </a>
                        <a href="#" className="flex items-center space-x-1 text-gray-700 hover:text-spark-purple transition-colors">
                            <Users className="w-4 h-4" />
                            <span>组队空间</span>
                        </a>
                        <a href="#" className="flex items-center space-x-1 text-gray-700 hover:text-spark-purple transition-colors">
                            <Briefcase className="w-4 h-4" />
                            <span>项目工坊</span>
                        </a>
                        <button className="flex items-center space-x-1 text-gray-700 hover:text-spark-purple transition-colors">
                            <User className="w-4 h-4" />
                            <span>登录</span>
                        </button>
                    </div>

                    {/* Mobile menu button */}
                    <div className="md:hidden">
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="text-gray-700 hover:text-spark-purple"
                        >
                            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                        </button>
                    </div>
                </div>

                {/* Mobile Menu */}
                {isOpen && (
                    <div className="md:hidden py-4 space-y-2">
                        <a href="#" className="block px-4 py-2 text-gray-700 hover:bg-spark-purple/10 rounded">
                            🔥 火花广场
                        </a>
                        <a href="#" className="block px-4 py-2 text-gray-700 hover:bg-spark-purple/10 rounded">
                            🚀 组队空间
                        </a>
                        <a href="#" className="block px-4 py-2 text-gray-700 hover:bg-spark-purple/10 rounded">
                            🛠️ 项目工坊
                        </a>
                        <a href="#" className="block px-4 py-2 text-gray-700 hover:bg-spark-purple/10 rounded">
                            👤 登录
                        </a>
                    </div>
                )}
            </div>
        </nav>
    )
}