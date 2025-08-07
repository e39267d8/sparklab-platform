"use client";
import { Heart, MessageCircle, Share2, Rocket, Tag, Trash2, Users } from "lucide-react";
import type { Idea } from "@/types/idea";

interface SparkZoneProps {
    ideas: Idea[];
    onDelete?: (id: number) => void;
    onUpgradeTeam?: (id: number) => void;
    onJoinTeam?: (id: number, user: string) => void;
}

const currentUser = "我自己"; // 后续可接入真实登录

export default function SparkZone({
    ideas,
    onDelete,
    onUpgradeTeam,
    onJoinTeam,
}: SparkZoneProps) {
    const tags = ["全部", "#找搭子", "#想法", "#求助", "#技能交换", "#创业大赛"];
    // 暂时不做标签筛选

    return (
        <div className="space-y-6">
            {/* 标签筛选 */}
            <div className="flex flex-wrap gap-2">
                {tags.map((tag) => (
                    <button
                        key={tag}
                        className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 bg-white/60 text-gray-700 hover:bg-white/80`}
                    >
                        {tag}
                    </button>
                ))}
            </div>

            {/* 创意卡片 */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {ideas.map((spark) => (
                    <div
                        key={spark.id}
                        className="spark-card p-6 group hover:scale-[1.02] cursor-pointer relative"
                    >
                        {/* 删除按钮 */}
                        {onDelete && (
                            <button
                                className="absolute top-2 right-2 text-gray-300 hover:text-red-400 transition"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    onDelete(spark.id);
                                }}
                                title="删除"
                            >
                                <Trash2 className="w-4 h-4" />
                            </button>
                        )}
                        {/* 头部信息 */}
                        <div className="flex items-start justify-between mb-4">
                            <div className="flex items-center space-x-2">
                                <div className="w-8 h-8 bg-gradient-to-r from-spark-purple to-spark-pink rounded-full flex items-center justify-center">
                                    <span className="text-white text-sm">{spark.avatar}</span>
                                </div>
                                <div>
                                    <div className="font-medium text-gray-900">{spark.author}</div>
                                    <div className="text-xs text-gray-500">{spark.timeAgo}</div>
                                </div>
                            </div>
                            <button className="opacity-0 group-hover:opacity-100 transition-opacity">
                                <Share2 className="w-4 h-4 text-gray-400 hover:text-spark-purple" />
                            </button>
                        </div>
                        {/* 内容 */}
                        <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">{spark.title}</h3>
                        <p className="text-gray-600 text-sm mb-4 line-clamp-3">{spark.content}</p>
                        {/* 标签 */}
                        <div className="flex flex-wrap gap-1 mb-4">
                            {spark.tags.map((tag) => (
                                <span
                                    key={tag}
                                    className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-spark-purple/10 text-spark-purple"
                                >
                                    <Tag className="w-3 h-3 mr-1" />
                                    {tag}
                                </span>
                            ))}
                        </div>
                        {/* 团队信息 */}
                        {spark.isTeam && (
                            <div className="mb-2 flex items-center gap-2">
                                <Users className="w-4 h-4 text-spark-purple" />
                                <span className="text-xs text-gray-600">
                                    团队成员：
                                    {spark.teamMembers && spark.teamMembers.length
                                        ? spark.teamMembers.join("、")
                                        : "暂无"}
                                </span>
                            </div>
                        )}
                        {/* 底部操作 */}
                        <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-4">
                                <button className="flex items-center space-x-1 text-gray-500 hover:text-red-500 transition-colors">
                                    <Heart className="w-4 h-4" />
                                    <span className="text-sm">{spark.likes}</span>
                                </button>
                                <button className="flex items-center space-x-1 text-gray-500 hover:text-blue-500 transition-colors">
                                    <MessageCircle className="w-4 h-4" />
                                    <span className="text-sm">{spark.comments}</span>
                                </button>
                            </div>
                            {/* 组队操作 */}
                            {!spark.isTeam ? (
                                onUpgradeTeam && (
                                    <button
                                        className="flex items-center space-x-1 px-3 py-1 bg-spark-green/10 text-spark-green rounded-full text-xs hover:bg-spark-green hover:text-white transition-all duration-200"
                                        onClick={e => { e.stopPropagation(); onUpgradeTeam(spark.id); }}
                                    >
                                        <Rocket className="w-3 h-3" />
                                        <span>升级组队</span>
                                    </button>
                                )
                            ) : (
                                onJoinTeam && (
                                    <button
                                        className="flex items-center space-x-1 px-3 py-1 bg-spark-purple/10 text-spark-purple rounded-full text-xs hover:bg-spark-purple hover:text-white transition-all duration-200"
                                        onClick={e => { e.stopPropagation(); onJoinTeam(spark.id, currentUser); }}
                                    >
                                        <Users className="w-3 h-3" />
                                        <span>加入团队</span>
                                    </button>
                                )
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}