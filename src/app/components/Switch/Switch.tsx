"use client"

import React from 'react'

interface SwitchProps {
    checked: boolean
    onChange: (checked: boolean) => void
    disabled?: boolean
    id?: string
}

const Switch: React.FC<SwitchProps> = ({
    checked,
    onChange,
    disabled = false,
    id,
}) => {
    return (
        <button
            type="button"
            role="switch"
            id={id}
            aria-checked={checked}
            disabled={disabled}
            onClick={() => onChange(!checked)}
            className={`relative inline-flex h-5 w-9 shrink-0 cursor-pointer items-center rounded-full transition-colors duration-200 ease-in-out focus:outline-none ${
                checked ? 'bg-white' : 'bg-[#4a4a4a]'
            } ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
            <span
                className={`pointer-events-none inline-block h-3.5 w-3.5 transform rounded-full transition-all duration-200 ease-in-out ${
                    checked
                        ? 'translate-x-4.5 bg-[#00d9ff]'
                        : 'translate-x-0.5 bg-white'
                }`}
            />
        </button>
    )
}

export default Switch

