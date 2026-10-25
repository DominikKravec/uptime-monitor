"use client"

import React, { useState } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import IconButton from '../IconButton/IconButton'
import SearchBar from '../SearchBar/SearchBar'
import { useAppContext } from '@/providers/AppProvider'
import Link from 'next/link'
import AddAppModal from '../AddAppModal/AddAppModal'

interface SidebarProps {}

const placeholderTargets = [
    { id: 'example-1', name: 'Example' },
    { id: 'example-2', name: 'Example 2' },
    { id: 'example-3', name: 'Highlighted' },
    { id: 'example-4', name: 'Example 3' },
]

const Sidebar: React.FC<SidebarProps> = () => {
    const router = useRouter()
    const pathname = usePathname()
    const { targets, searchQuery, setSearchQuery } = useAppContext()
    const [modal, setModal] = useState(false)

    // Use actual targets if available; otherwise show placeholder targets from screenshot
    const displayTargets = targets && targets.length > 0
        ? targets.map(t => ({ id: t.id, name: t.name }))
        : placeholderTargets

    const filteredTargets = displayTargets.filter(target =>
        target.name.toLowerCase().includes((searchQuery || '').toLowerCase())
    )

    return (
        <aside className="relative flex flex-col w-64 min-h-screen px-6 py-8 border-r border-[#00d9ff] bg-[#161616] shrink-0 select-none">
            {/* Top Navigation */}
            <div className="flex flex-col gap-2 mb-4">
                <IconButton
                    name="Home"
                    icon="/home.svg"
                    action={() => router.push('/dashboard')}
                />

                <IconButton
                    name="Add app"
                    icon="/Plus icon.svg"
                    action={() => setModal(true)}
                />
            </div>

            {/* Search Input */}
            <div className="mb-6">
                <SearchBar
                    value={searchQuery}
                    setValue={setSearchQuery}
                    placeholder="Search"
                />
            </div>

            {/* App Targets List */}
            <nav className="flex flex-col gap-2">
                {filteredTargets.map(target => {
                    const isCurrent = pathname === `/dashboard/${target.id}` || pathname === `/dashboard/${target.name}`

                    return (
                        <Link
                            key={target.id}
                            href={`/dashboard/${target.id}`}
                            className={`block text-base transition-opacity duration-150 ${
                                isCurrent
                                    ? 'bg-[#00d9ff]/20 text-white rounded-full px-4 py-1.5 opacity-100 font-medium'
                                    : 'text-white opacity-70 hover:opacity-100 px-4 py-1.5'
                            }`}
                        >
                            {target.name}
                        </Link>
                    )
                })}
            </nav>

            <AddAppModal
                isActive={modal}
                setIsActive={setModal}
            />
        </aside>
    )
}

export default Sidebar
