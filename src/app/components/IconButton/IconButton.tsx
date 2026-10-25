"use client"

import React from 'react'

interface IconButtonProps {
    name: string
    action: () => void
    icon: string
    className?: string
}

const IconButton: React.FC<IconButtonProps> = ({ name, action, icon, className = "" }) => {
  return (
    <button
      type="button"
      onClick={action}
      className={`flex items-center gap-3 w-full py-2 text-left text-white text-xl md:text-2xl font-normal transition-opacity hover:opacity-80 cursor-pointer ${className}`}
    >
      {icon && (
        <img
          src={icon}
          alt={name}
          className="w-7 h-7 object-contain shrink-0"
        />
      )}

      <span>{name}</span>
    </button>
  )
}

export default IconButton
