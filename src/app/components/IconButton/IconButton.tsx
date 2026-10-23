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
      className={`flex items-center justify-between w-full py-2.5 text-left text-white text-xl md:text-2xl font-normal transition-opacity hover:opacity-80 cursor-pointer ${className}`}
    >
      <span>{name}</span>

      {icon && (
        <img
          src={icon}
          alt={name}
          className="w-8 h-8 object-contain ml-auto shrink-0"
        />
      )}
    </button>
  )
}

export default IconButton
