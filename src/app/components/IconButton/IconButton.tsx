"use client"

import React from 'react'

interface IconButtonProps {
    name?: string
    action: () => void
    icon: string
    className?: string
    disabled?: boolean
    title?: string
}

const IconButton: React.FC<IconButtonProps> = ({
    name,
    action,
    icon,
    className = "text-xl md:text-2xl w-full",
    disabled = false,
    title,
}) => {
  return (
    <button
      type="button"
      onClick={action}
      disabled={disabled}
      title={title || name}
      className={`flex items-center gap-3 py-1.5 text-left text-white font-normal transition-opacity hover:opacity-80 cursor-pointer ${disabled ? 'opacity-50 cursor-not-allowed' : ''} ${className}`}
    >
      {icon && (
        <img
          src={icon}
          alt={name || "icon"}
          className="w-7 h-7 object-contain shrink-0"
        />
      )}

      {name && <span>{name}</span>}
    </button>
  )
}

export default IconButton
