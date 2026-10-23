"use client"

import React, { useId } from "react";
import { useRouter } from "next/navigation";

interface AppCardProps {
    id?: string;
    name: string;
    URL: string;
    isActive: boolean;
    statusCode?: number | null;
    latency?: number | null;
    onClick?: () => void;
}

const AppCard: React.FC<AppCardProps> = ({
    id,
    name,
    URL,
    isActive,
    statusCode = 200,
    latency = 50,
    onClick,
}) => {
    const router = useRouter();
    const uniqueId = useId().replace(/:/g, "-");

    const handleClick = () => {
        if (onClick) {
            onClick();
        } else if (id) {
            router.push(`/dashboard/${id}`);
        }
    };

    return (
        <div
            onClick={handleClick}
            className={`relative flex flex-col justify-between rounded-2xl p-6 bg-[#161616] transition-all duration-200 cursor-pointer hover:border-opacity-100 ${
                isActive
                    ? "border border-[#00d9ff] hover:shadow-[0_0_20px_rgba(0,217,255,0.12)]"
                    : "border border-[#383838]"
            }`}
        >
            {/* Header: Title, URL, and Status */}
            <div className="flex items-start justify-between mb-4">
                <div>
                    <h3 className="text-2xl font-bold text-white tracking-tight">{name}</h3>
                    <p className="text-sm text-neutral-400 mt-0.5">{URL}</p>
                </div>
                <span
                    className={`text-base font-medium ${
                        isActive ? "text-[#00d9ff]" : "text-neutral-400"
                    }`}
                >
                    {isActive ? "Tracked" : "Not Tracked"}
                </span>
            </div>

            {/* Bottom Row: Metrics on Left, Chart on Right */}
            <div className="grid grid-cols-[100px_1fr] sm:grid-cols-[120px_1fr] gap-4 items-end mt-4">
                {/* Status & Latency Information */}
                <div className="flex flex-col gap-1 pb-1">
                    <div className="text-sm text-[#8f96a3]">
                        Status:{" "}
                        {isActive && statusCode ? (
                            <span className="text-white font-bold">{statusCode}</span>
                        ) : null}
                    </div>
                    <div className="text-sm text-[#8f96a3]">
                        Latency:{" "}
                        {isActive && latency !== undefined && latency !== null ? (
                            <>
                                <span className="text-white font-bold">{latency}</span> ms
                            </>
                        ) : null}
                    </div>
                </div>

                {/* Response Chart Box */}
                <div
                    className={`relative w-full h-36 rounded-xs overflow-hidden ${
                        isActive ? "border border-[#00d9ff]" : "border border-[#383838]"
                    }`}
                >
                    <svg
                        className="w-full h-full block"
                        viewBox="0 0 320 140"
                        preserveAspectRatio="none"
                    >
                        <defs>
                            <linearGradient
                                id={`chart-grad-${uniqueId}`}
                                x1="0"
                                y1="0"
                                x2="0"
                                y2="1"
                            >
                                <stop offset="0%" stopColor="#00d9ff" stopOpacity="0.4" />
                                <stop offset="100%" stopColor="#00d9ff" stopOpacity="0.0" />
                            </linearGradient>
                        </defs>

                        {/* Horizontal Grid lines */}
                        {[14, 28, 42, 56, 70, 84, 98, 112, 126].map((y) => (
                            <line
                                key={y}
                                x1="0"
                                y1={y}
                                x2="320"
                                y2={y}
                                stroke="#252525"
                                strokeWidth="1"
                            />
                        ))}

                        {/* Smooth Curve Line and Glowing Area Gradient (Active Only) */}
                        {isActive && (
                            <>
                                <path
                                    d="M 0,55 C 40,65 55,95 80,95 C 105,95 120,86 145,84 C 185,80 205,38 240,38 C 275,38 295,58 320,65 L 320,140 L 0,140 Z"
                                    fill={`url(#chart-grad-${uniqueId})`}
                                />
                                <path
                                    d="M 0,55 C 40,65 55,95 80,95 C 105,95 120,86 145,84 C 185,80 205,38 240,38 C 275,38 295,58 320,65"
                                    fill="none"
                                    stroke="#00d9ff"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                />
                            </>
                        )}
                    </svg>
                </div>
            </div>
        </div>
    );
};

export default AppCard;
