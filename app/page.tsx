"use client";
import { useState } from "react";
import SparkZone from "@/components/SparkZone";
import Navbar from "@/components/Navbar";
import type { Idea } from "@/types/idea";

const mockSparks: Idea[] = [
    {
        id: 1,
        title: "寻找设计师一起做个有趣的小程序",
        content:
            "想法：做一个帮助大学生记录日常灵感的小程序，用卡片形式展示。需要UI设计师和前端开发者各一名 🎨",
        author: "创意小白",
        tags: ["#找搭子", "#设计", "#小程序"],
        likes: 23,
        comments: 8,
        timeAgo: "2小时前",
        avatar: "🎯",
        isTeam: false,
        teamMembers: [],
    },
    {
        id: 2,
        title: "组队参加创新创业大赛",
        content:
            "有一个关于环保的项目想法，计划做智能垃圾分类助手。目前缺少技术开发和市场调研的同学。比赛奖金丰厚！",
        author: "环保达人",
        tags: ["#创业大赛", "#技术", "#环保"],
        likes: 45,
        comments: 15,
        timeAgo: "5小时前",
        avatar: "🌱",
        isTeam: true,
        teamMembers: ["环保达人", "小王", "小李"],
    },
    {
        id: 3,
        title: "一起做个好玩的网站吧",
        content:
            "想做一个年轻人分享生活技巧的社区网站，类似小红书但更简洁。我负责产品策划，求前后端开发大佬带飞 ✈️",
        author: "产品新手",
        tags: ["#网站开发", "#社区", "#产品"],
        likes: 67,
        comments: 23,
        timeAgo: "1天前",
        avatar: "💡",
        isTeam: false,
        teamMembers: [],
    },
];

const currentUser = "我自己"; // 可接入登录

export default function Home() {
    const [ideas, setIdeas] = useState<Idea[]>(mockSparks);
    const [form, setForm] = useState({ title: "", content: "", tags: "" });
    const [showForm, setShowForm] = useState(false);

    // 新增创意
    function handleAddIdea(e: React.FormEvent) {
        e.preventDefault();
        if (!form.title || !form.content) return;
        const newIdea: Idea = {
            id: Date.now(),
            title: form.title,
            content: form.content,
            author: currentUser,
            tags: form.tags
                .split(/[,， ]+/)
                .map((t) => (t.startsWith("#") ? t : "#" + t))
                .filter(Boolean),
            likes: 0,
            comments: 0,
            timeAgo: "刚刚",
            avatar: "🔥",
            isTeam: false,
            teamMembers: [],
        };
        setIdeas([newIdea, ...ideas]);
        setForm({ title: "", content: "", tags: "" });
        setShowForm(false);
    }

    // 删除创意
    function handleDeleteIdea(id: number) {
        setIdeas(ideas.filter((idea) => idea.id !== id));
    }

    // 升级为团队
    function handleUpgradeTeam(id: number) {
        setIdeas((ideas) =>
            ideas.map((idea) =>
                idea.id === id
                    ? { ...idea, isTeam: true, teamMembers: [idea.author] }
                    : idea
            )
        );
    }

    // 加入团队
    function handleJoinTeam(id: number, user: string) {
        setIdeas((ideas) =>
            ideas.map((idea) =>
                idea.id === id && idea.isTeam
                    ? {
                        ...idea,
                        teamMembers: idea.teamMembers?.includes(user)
                            ? idea.teamMembers
                            : [...(idea.teamMembers || []), user],
                    }
                    : idea
            )
        );
    }

    return (
        <main>
            <Navbar />
            <div className="container mx-auto px-4 py-8">
                <div className="text-center mb-12">
                    <h1 className="text-6xl font-bold mb-4">
                        <span className="bg-gradient-to-r from-spark-purple via-spark-pink to-spark-blue bg-clip-text text-transparent">
                            SparkLab
                        </span>
                    </h1>
                    <p className="text-xl text-gray-600 mb-8">
                        🔥 创意火花 → 组队实干 → 年轻人的协作平台
                    </p>
                    <div className="flex justify-center gap-4">
                        <button
                            className="spark-button"
                            onClick={() => setShowForm((s) => !s)}
                        >
                            ✨ 发布创意
                        </button>
                        <button className="px-6 py-3 rounded-full font-medium border-2 border-spark-purple text-spark-purple hover:bg-spark-purple hover:text-white transition-all duration-200">
                            🚀 寻找搭子
                        </button>
                    </div>
                </div>

                {/* 创意发布表单 */}
                {showForm && (
                    <form
                        onSubmit={handleAddIdea}
                        className="max-w-xl mx-auto bg-white/90 border border-gray-200 rounded-xl shadow-lg p-6 my-8 space-y-4"
                    >
                        <h2 className="text-lg font-bold text-spark-purple mb-2">
                            发布新创意
                        </h2>
                        <input
                            className="w-full px-3 py-2 border rounded mb-2"
                            placeholder="创意标题"
                            value={form.title}
                            onChange={(e) => setForm({ ...form, title: e.target.value })}
                            required
                        />
                        <textarea
                            className="w-full px-3 py-2 border rounded mb-2"
                            rows={3}
                            placeholder="详细描述一下你的创意吧"
                            value={form.content}
                            onChange={(e) => setForm({ ...form, content: e.target.value })}
                            required
                        />
                        <input
                            className="w-full px-3 py-2 border rounded mb-2"
                            placeholder="标签（用逗号或空格分隔, 如 #AI,创意,产品）"
                            value={form.tags}
                            onChange={(e) => setForm({ ...form, tags: e.target.value })}
                        />
                        <div className="flex gap-4">
                            <button type="submit" className="spark-button flex-1">
                                发布
                            </button>
                            <button
                                type="button"
                                className="flex-1 border border-gray-300 rounded-full px-6 py-3 text-gray-600 hover:bg-gray-100"
                                onClick={() => setShowForm(false)}
                            >
                                取消
                            </button>
                        </div>
                    </form>
                )}

                {/* 创意列表及团队操作 */}
                <SparkZone
                    ideas={ideas}
                    onDelete={handleDeleteIdea}
                    onUpgradeTeam={handleUpgradeTeam}
                    onJoinTeam={handleJoinTeam}
                />
            </div>
        </main>
    );
}