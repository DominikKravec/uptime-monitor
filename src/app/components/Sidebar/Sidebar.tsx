import React, { useState } from 'react'
import IconButton from '../IconButton/IconButton'
import { redirect } from 'next/navigation'
import SearchBar from '../SearchBar/SearchBar'
import { useAppContext } from '@/providers/AppProvider'
import Link from 'next/link'
import AddAppModal from '../AddAppModal/AddAppModal'

interface SidebarProps{}

const Sidebar: React.FC<SidebarProps> = () => {

    const [testQuery, setTestQuery] = useState('')

    const {targets} = useAppContext()

    const [modal, setModal] = useState(false)

    return (
        <section className='min-h-full relative w-50 px-5 flex flex-col'>
            <IconButton
                name={'Home'}
                action={() => {redirect("/dashboard/")}}
                icon={''/* TODO !!! */} 
            />

            <IconButton
                name={'Add app'}
                action={() => {setModal(true)}}
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

            <AddAppModal
                isActive={modal}
                setIsActive={setModal}
            />

        </section>
    )
}

export default Sidebar
