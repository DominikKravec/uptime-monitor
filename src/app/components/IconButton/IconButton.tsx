"use client"

import React from 'react'

interface IconButtonProps{
    name: string,
    action: () => {},
    icon: string,
}

const IconButton: React.FC<IconButtonProps> = ({name, action, icon}) => {
  return (
    <div className='flex flex-row w-full bg-green-400'
        onClick={() => {action()}}
    >
        <span className=''>{name}</span>

        <span className='ml-auto'>
            X
        </span>
    </div>
  )
}

export default IconButton