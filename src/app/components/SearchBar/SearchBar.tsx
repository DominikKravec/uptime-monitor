"use client"

import React, { useRef } from 'react'

interface SearchBarProps {
    onChange?: (query: string) => void
    value: string
    setValue: (value: string) => void
    placeholder?: string
}

const SearchBar: React.FC<SearchBarProps> = ({
    onChange,
    value,
    setValue,
    placeholder = "Search"
}) => {
    const timeoutRef = useRef<NodeJS.Timeout | null>(null)

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const val = e.target.value
        setValue(val)

        if (onChange) {
            if (timeoutRef.current) clearTimeout(timeoutRef.current)
            timeoutRef.current = setTimeout(() => {
                onChange(val)
            }, 250)
        }
    }

    return (
        <div className="relative flex items-center w-full rounded-full border border-[#00d9ff] px-3.5 py-1.5 bg-transparent my-2">
            <input 
                type="text" 
                value={value} 
                onChange={handleInputChange}
                placeholder={placeholder}
                className="w-full bg-transparent text-sm text-white placeholder:text-neutral-400 placeholder:opacity-70 focus:outline-none pr-7"
            />
            <img
                src="/Search Icon.svg"
                alt="Search"
                className="w-4 h-4 object-contain absolute right-3.5 pointer-events-none"
            />
        </div>
    )
}

export default SearchBar
