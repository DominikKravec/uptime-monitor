import React, { useState } from 'react'
import IconButton from '../IconButton/IconButton'
import { redirect } from 'next/navigation'
import SearchBar from '../SearchBar/SearchBar'
import { useAppContext } from '@/providers/AppProvider'
import Link from 'next/link'

interface SidebarProps{}

const Sidebar: React.FC<SidebarProps> = () => {

    const [testQuery, setTestQuery] = useState('')

    const {targets} = useAppContext()

    return (
        <section className='min-h-full w-50 px-5 flex flex-col'>
            <IconButton
                name={'Home'}
                action={() => {redirect("/dashboard/")}}
                icon={''/* TODO !!! */} 
            />

            <IconButton
                name={'Add app'}
                action={() => {alert("Addding app")}}
                icon={''/* TODO !!! */} 
            />

            <SearchBar
                value={testQuery}
                setValue={setTestQuery}
                onChange={(query: string) => {
                    alert("The input was: " + query)
                }}
            />

            {
                //displa target links
                targets.map(target => 
                    (
                        <span 
                            key={target.id}
                        >
                            <Link
                                href={"/dashboard/" + target.id}
                            >
                                {target.name}
                            </Link>
                        </span>
                    )
                )
            }

        </section>
    )
}

export default Sidebar
