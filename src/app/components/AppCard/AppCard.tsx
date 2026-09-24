import { useState } from "react";
import React from "react";

interface AppCardProps{
    name: string
    URL: string
    isActive: Boolean
}

const AppCard: React.FC<AppCardProps> = ({name, URL, isActive}) => {
    return (
        <div className="app-card">

            <span>
                {name}
            </span>

            <span>
                {URL}
            </span>

            <span>
                {isActive ? "UP" : "DOWN"}                
            </span>

        </div>
    )
}

export default AppCard