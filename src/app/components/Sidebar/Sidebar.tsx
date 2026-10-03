import React, { useState } from 'react'
import IconButton from '../IconButton/IconButton'
import { redirect } from 'next/navigation'
import SearchBar from '../SearchBar/SearchBar'

interface SidebarProps{}

const Sidebar: React.FC<SidebarProps> = () => {

    const [testQuery, setTestQuery] = useState('')

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

        </section>
    )
}

export default Sidebar
