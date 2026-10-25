"use client"

import React, { useState, useRef, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { useAppContext } from "@/providers/AppProvider";
import Switch from "@/app/components/Switch/Switch";

export default function AppDetailsPage() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;

  const { targets, isLoading, refreshTargets } = useAppContext();

  // Find target or fallback to placeholder data matching the Figma mock
  const target = targets.find((t) => t.id === id);

  const [name, setName] = useState("Highlighted");
  const [url, setUrl] = useState("example.com");
  const [pingDelay, setPingDelay] = useState(10);
  const [isTracked, setIsTracked] = useState(true);

  // Editing state for pill inputs
  const [isEditingName, setIsEditingName] = useState(false);
  const [isEditingUrl, setIsEditingUrl] = useState(false);
  const [isEditingDelay, setIsEditingDelay] = useState(false);

  const nameInputRef = useRef<HTMLInputElement>(null);
  const urlInputRef = useRef<HTMLInputElement>(null);
  const delayInputRef = useRef<HTMLInputElement>(null);

  // Sync state with target once loaded
  useEffect(() => {
    if (target) {
      setName(target.name);
      setUrl(target.url);
      setPingDelay(target.interval || 10);
      setIsTracked(target.active ?? true);
    } else if (id === "example-2") {
      setName("Example 2");
      setUrl("example2.com");
      setPingDelay(10);
      setIsTracked(false);
    } else if (id === "example-3" || id === "Highlighted") {
      setName("Highlighted");
      setUrl("example.com");
      setPingDelay(10);
      setIsTracked(true);
    }
  }, [target, id]);

  // Focus inputs when switching to editing mode
  useEffect(() => {
    if (isEditingName && nameInputRef.current) {
      nameInputRef.current.focus();
      nameInputRef.current.select();
    }
  }, [isEditingName]);

  useEffect(() => {
    if (isEditingUrl && urlInputRef.current) {
      urlInputRef.current.focus();
      urlInputRef.current.select();
    }
  }, [isEditingUrl]);

  useEffect(() => {
    if (isEditingDelay && delayInputRef.current) {
      delayInputRef.current.focus();
      delayInputRef.current.select();
    }
  }, [isEditingDelay]);

  const removeTarget = async () => {
    if (!window.confirm("Are you sure you want to delete this app?")) return;

    if (!target) {
      router.push("/dashboard");
      return;
    }

    try {
      const response = await fetch(`/api/targets/${id}`, {
        method: "DELETE",
      });

      const result = await response.json();

      if (result.success) {
        await refreshTargets();
        router.push("/dashboard");
      } else {
        alert("Error deleting target\n" + result.error);
      }
    } catch (error) {
      alert("Failed to delete target!!!\n" + error);
    }
  };

  if (isLoading && targets.length === 0) {
    return (
      <div className="p-8 text-neutral-400 text-lg">Loading...</div>
    );
  }

  return (
    <div className="w-full max-w-5xl py-4">
      {/* App Title (Editable) */}
      <div className="mb-8">
        {isEditingName ? (
          <input
            ref={nameInputRef}
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            onBlur={() => setIsEditingName(false)}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === "Escape") {
                setIsEditingName(false);
              }
            }}
            className="rounded-full bg-[#1a2c2f] px-5 py-1 text-2xl sm:text-3xl font-bold text-white focus:outline-none max-w-full"
            style={{ width: `${Math.max(name.length + 3, 10)}ch` }}
          />
        ) : (
          <h1
            onClick={() => setIsEditingName(true)}
            className="text-3xl sm:text-4xl font-bold text-white tracking-tight cursor-pointer hover:text-white/80 transition-colors inline-block"
            title="Click to edit name"
          >
            {name}
          </h1>
        )}
      </div>

      {/* Metadata Overview */}
      <div className="flex flex-wrap items-start justify-between gap-y-4 max-w-2xl mb-10">
        {/* Left Column: URL, Ping delay, Tracked switch */}
        <div className="flex flex-col gap-3 min-w-[240px]">
          {/* URL Row */}
          <div className="flex items-center gap-1.5 text-base">
            <span className="text-[#8f96a3]">URL:</span>
            {isEditingUrl ? (
              <input
                ref={urlInputRef}
                type="text"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                onBlur={() => setIsEditingUrl(false)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === "Escape") {
                    setIsEditingUrl(false);
                  }
                }}
                className="rounded-full bg-[#1a2c2f] px-4 py-0.5 text-white text-base focus:outline-none w-56 sm:w-64"
              />
            ) : (
              <span
                onClick={() => setIsEditingUrl(true)}
                className="text-white cursor-pointer hover:text-white/80 transition-colors"
                title="Click to edit URL"
              >
                {url}
              </span>
            )}
          </div>

          {/* Ping Delay Row */}
          <div className="flex items-center gap-1.5 text-base">
            <span className="text-[#8f96a3]">Ping delay:</span>
            {isEditingDelay ? (
              <input
                ref={delayInputRef}
                type="number"
                value={pingDelay}
                onChange={(e) => setPingDelay(Number(e.target.value))}
                onBlur={() => setIsEditingDelay(false)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === "Escape") {
                    setIsEditingDelay(false);
                  }
                }}
                className="rounded-full bg-[#1a2c2f] px-4 py-0.5 text-white font-bold text-base focus:outline-none w-28 text-center [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
              />
            ) : (
              <span
                onClick={() => setIsEditingDelay(true)}
                className="font-bold text-white cursor-pointer hover:text-white/80 transition-colors"
                title="Click to edit delay"
              >
                {pingDelay}
              </span>
            )}
            <span className="text-[#8f96a3]">s</span>
          </div>

          {/* Tracked Toggle Switch */}
          <div className="flex items-center gap-3 text-base mt-0.5">
            <span className="text-white">Tracked</span>
            <Switch
              checked={isTracked}
              onChange={setIsTracked}
            />
          </div>
        </div>

        {/* Right Column: Status, Latency */}
        <div className="flex flex-col gap-3 min-w-[180px]">
          <div className="text-base text-[#8f96a3]">
            Status: <span className="font-bold text-white">200</span>
          </div>
          <div className="text-base text-[#8f96a3]">
            Latency:{" "}
            <span className="font-bold text-white">60</span>{" "}
            <span className="text-[#8f96a3]">ms</span>
          </div>
        </div>
      </div>

      {/* Large Latency Chart */}
      <div
        className={`relative w-full h-[320px] sm:h-[380px] bg-[#161616] overflow-hidden transition-colors duration-200 ${
          isTracked
            ? "border border-[#00d9ff]/80 shadow-[0_0_25px_rgba(0,217,255,0.08)]"
            : "border border-[#383838]"
        }`}
      >
        <svg
          className="w-full h-full block"
          viewBox="0 0 700 350"
          preserveAspectRatio="none"
        >
          <defs>
            <linearGradient id="detail-chart-grad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#00d9ff" stopOpacity="0.35" />
              <stop offset="100%" stopColor="#00d9ff" stopOpacity="0.0" />
            </linearGradient>
          </defs>

          {/* Horizontal Grid Lines */}
          {[30, 65, 100, 135, 170, 205, 240, 275, 310].map((y) => (
            <line
              key={y}
              x1="0"
              y1={y}
              x2="700"
              y2={y}
              stroke="#242424"
              strokeWidth="1"
            />
          ))}

          {/* Smooth Curve and Glowing Gradient Fill (Active Only) */}
          {isTracked && (
            <>
              <path
                d="M 0,160 C 80,180 150,225 240,225 C 310,225 360,205 420,195 C 490,185 520,135 580,135 C 630,135 670,165 700,175 L 700,350 L 0,350 Z"
                fill="url(#detail-chart-grad)"
              />
              <path
                d="M 0,160 C 80,180 150,225 240,225 C 310,225 360,205 420,195 C 490,185 520,135 580,135 C 630,135 670,165 700,175"
                fill="none"
                stroke="#00d9ff"
                strokeWidth="2.5"
                strokeLinecap="round"
              />
            </>
          )}
        </svg>
      </div>

      {/* Delete App Button placed below */}
      <div className="mt-10 flex justify-start">
        <button
          type="button"
          onClick={removeTarget}
          className="cursor-pointer text-red-500 hover:text-red-400 text-sm font-medium transition-colors"
        >
          REMOVE APP
        </button>
      </div>
    </div>
  );
}
