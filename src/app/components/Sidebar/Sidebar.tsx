import React from 'react'
import IconButton from '../IconButton/IconButton'
import { redirect } from 'next/navigation'

interface SidebarProps{

}

const Sidebar: React.FC<SidebarProps> = () => {
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

    </section>
  )
}

export default Sidebar
